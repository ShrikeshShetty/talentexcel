import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, FileText, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import supabase from '../../lib/supabaseClient';

const EmployerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingReview: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      setLoading(true);
      
      try {
        // Fetch employer profile
        const { data: employerProfile } = await supabase
          .from('employer_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!employerProfile) {
          setLoading(false);
          return;
        }

        // Fetch active job listings
        const { data: jobsData, error: jobsError } = await supabase
          .from('job_listings')
          .select('*')
          .eq('employer_id', employerProfile.id)
          .eq('status', 'published')
          .order('created_at', { ascending: false });
          
        if (jobsError) throw jobsError;
        setActiveJobs(jobsData || []);
        
        // Fetch recent applications
        const { data: applications, error: appsError } = await supabase
          .from('applications')
          .select(`
            *,
            job_listings:job_id (
              title,
              type
            ),
            profiles:student_id (
              avatar_url,
              user_id,
              users:user_id (
                full_name
              )
            )
          `)
          .in('job_id', jobsData?.map(job => job.id) || [])
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (appsError) throw appsError;
        setRecentApplications(applications || []);
        
        // Calculate stats
        const { count: totalJobs } = await supabase
          .from('job_listings')
          .select('*', { count: 'exact', head: true })
          .eq('employer_id', employerProfile.id);
          
        const { count: activeJobsCount } = await supabase
          .from('job_listings')
          .select('*', { count: 'exact', head: true })
          .eq('employer_id', employerProfile.id)
          .eq('status', 'published');
          
        const { count: totalApplications } = await supabase
          .from('applications')
          .select('*', { count: 'exact', head: true })
          .in('job_id', jobsData?.map(job => job.id) || []);
          
        const { count: pendingReview } = await supabase
          .from('applications')
          .select('*', { count: 'exact', head: true })
          .in('job_id', jobsData?.map(job => job.id) || [])
          .eq('status', 'pending');
          
        setJobStats({
          totalJobs: totalJobs || 0,
          activeJobs: activeJobsCount || 0,
          totalApplications: totalApplications || 0,
          pendingReview: pendingReview || 0
        });
        
      } catch (error) {
        console.error('Error fetching employer dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-neutral-900">Employer Dashboard</h1>
        <Button 
          variant="primary" 
          onClick={() => {}}
          leftIcon={<Briefcase size={18} />}
        >
          Post a New Job
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mb-4">
              <Briefcase size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{jobStats.totalJobs}</h3>
            <p className="text-neutral-600">Total Jobs</p>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-complementary-100 rounded-full flex items-center justify-center text-complementary-500 mb-4">
              <Briefcase size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{jobStats.activeJobs}</h3>
            <p className="text-neutral-600">Active Jobs</p>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-500 mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{jobStats.totalApplications}</h3>
            <p className="text-neutral-600">Total Applications</p>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center text-warning mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{jobStats.pendingReview}</h3>
            <p className="text-neutral-600">Pending Review</p>
          </div>
        </Card>
      </div>

      {/* Active Job Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Active Job Listings</h2>
          <Link to="/manage-jobs" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {activeJobs.length > 0 ? (
          <div className="space-y-4">
            {activeJobs.slice(0, 3).map((job) => (
              <Card key={job.id} hover>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
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
                  <div className="flex items-center gap-2 mt-3 md:mt-0">
                    <span className="text-sm text-neutral-500">
                      Applications: <span className="font-semibold">{Math.floor(Math.random() * 20)}</span>
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-6">
              <p className="text-neutral-600">You don't have any active job listings.</p>
              <Button 
                variant="primary"
                className="mt-4"
                onClick={() => {}}
                leftIcon={<Briefcase size={18} />}
              >
                Post a Job
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Recent Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Recent Applications</h2>
          <Link to="/applications-received" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {recentApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-neutral-200 rounded-full flex items-center justify-center">
                          {app.profiles.avatar_url ? (
                            <img className="h-10 w-10 rounded-full" src={app.profiles.avatar_url} alt="" />
                          ) : (
                            <Users size={20} className="text-neutral-500" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">
                            {app.profiles.users.full_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{app.job_listings.title}</div>
                      <div className="text-xs text-neutral-500">{app.job_listings.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'pending' ? 'bg-neutral-100 text-neutral-800' : 
                        app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'shortlisted' ? 'bg-complementary-100 text-complementary-800' :
                        app.status === 'rejected' ? 'bg-error/10 text-error' :
                        'bg-success/10 text-success'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="text" size="sm">
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Card>
            <div className="text-center py-6">
              <p className="text-neutral-600">No applications received yet.</p>
            </div>
          </Card>
        )}
      </div>
      
      {/* Talent Search (Placeholder for future development) */}
      <Card>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
            <Search size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Find Talented Candidates</h3>
            <p className="text-neutral-600">
              Search our talent pool to find candidates with specific skills or qualifications that match your requirements.
            </p>
          </div>
          <Button variant="primary">
            Search Talent
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EmployerDashboard;