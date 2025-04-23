import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search, MapPin, Briefcase, Filter, X, BookmarkPlus } from 'lucide-react';
import supabase from '../../lib/supabaseClient';
import { motion } from 'framer-motion';

const JobListings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [jobType, setJobType] = useState<string>(searchParams.get('type') || '');
  const [remote, setRemote] = useState(searchParams.get('remote') === 'true');
  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      
      try {
        let query = supabase
          .from('job_listings')
          .select(`
            *,
            employer_profiles:employer_id (
              company_name,
              logo_url
            )
          `)
          .eq('status', 'published')
          .order('created_at', { ascending: false });
        
        // Apply filters
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
        }
        
        if (location) {
          query = query.ilike('location', `%${location}%`);
        }
        
        if (jobType) {
          query = query.eq('type', jobType);
        }
        
        if (remote) {
          query = query.eq('remote', true);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        setJobs(data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [searchQuery, location, jobType, remote]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL params
    const params: any = {};
    if (searchQuery) params.q = searchQuery;
    if (location) params.location = location;
    if (jobType) params.type = jobType;
    if (remote) params.remote = 'true';
    
    setSearchParams(params);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setJobType('');
    setRemote(false);
    setSearchParams({});
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      
      <div className="flex-grow">
        {/* Search Header */}
        <div className="bg-primary-600 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold font-display text-white mb-6 text-center">
              Find Your Perfect Opportunity
            </h1>
            
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-neutral-500" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-transparent rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={20} className="text-neutral-500" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-transparent rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="secondary"
                  className="md:w-auto"
                  leftIcon={<Search size={18} />}
                >
                  Search
                </Button>
              </div>
              
              <div className="flex justify-between items-center mt-4 text-white">
                <button
                  type="button"
                  className="flex items-center text-sm hover:underline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? <X size={16} className="mr-1" /> : <Filter size={16} className="mr-1" />}
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                
                {(searchQuery || location || jobType || remote) && (
                  <button
                    type="button"
                    className="text-sm hover:underline"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
              
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Job Type</label>
                      <select
                        className="w-full p-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        <option value="">All Types</option>
                        <option value="job">Full-Time Job</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="remote"
                        type="checkbox"
                        checked={remote}
                        onChange={(e) => setRemote(e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <label htmlFor="remote" className="ml-2 block text-sm text-white">
                        Remote Only
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-neutral-900">
              {loading ? 'Loading opportunities...' : `${jobs.length} Opportunities Found`}
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-neutral-500 mr-2">Sort by:</span>
              <select
                className="text-sm border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option>Newest First</option>
                <option>Relevance</option>
                <option>Salary: High to Low</option>
                <option>Salary: Low to High</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <Card key={job.id} className="p-0 overflow-hidden" hover>
                    <button
                      className="w-full text-left"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center">
                          <div className="flex items-start md:items-center mb-4 md:mb-0">
                            <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-primary-500 mr-4">
                              {job.employer_profiles.logo_url ? (
                                <img
                                  src={job.employer_profiles.logo_url}
                                  alt={job.employer_profiles.company_name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <Briefcase size={24} />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-neutral-900 mb-1">{job.title}</h3>
                              <p className="text-neutral-600 text-sm">{job.employer_profiles.company_name}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 md:ml-auto">
                            <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                              {job.type === 'internship' ? 'Internship' : 'Full-time'}
                            </span>
                            <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                              {job.location}
                            </span>
                            {job.remote && (
                              <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                                Remote
                              </span>
                            )}
                          </div>
                        </div>
                      
                        <div className="mt-4">
                          <p className="text-neutral-700 line-clamp-2">
                            {job.description.length > 200
                              ? `${job.description.substring(0, 200)}...`
                              : job.description}
                          </p>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job.skills_required.slice(0, 5).map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills_required.length > 5 && (
                            <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">
                              +{job.skills_required.length - 5} more
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm text-neutral-600">
                            {job.salary_min && job.salary_max ? (
                              <span>₹{job.salary_min / 1000}k - ₹{job.salary_max / 1000}k</span>
                            ) : (
                              <span>Salary not disclosed</span>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-neutral-500">
                            <BookmarkPlus size={16} className="mr-1" />
                            <span>Save</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </Card>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mx-auto mb-4">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-neutral-600 mb-6">
                    We couldn't find any jobs matching your search criteria.
                  </p>
                  <Button variant="primary" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {jobs.length > 0 && !loading && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline">
                Load More Results
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobListings;