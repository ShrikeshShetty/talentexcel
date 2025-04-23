import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, Briefcase, Award, BookOpen } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import supabase from '../../lib/supabaseClient';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      setLoading(true);
      
      try {
        // Fetch profile completion status
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        const { data: studentData } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        // Calculate profile completion percentage
        if (profileData && studentData) {
          let completedFields = 0;
          let totalFields = 0;
          
          // Count profile fields
          Object.entries(profileData).forEach(([key, value]) => {
            if (key !== 'id' && key !== 'user_id' && key !== 'created_at' && key !== 'updated_at') {
              totalFields++;
              if (value) completedFields++;
            }
          });
          
          // Count student profile fields
          Object.entries(studentData).forEach(([key, value]) => {
            if (key !== 'id' && key !== 'user_id' && key !== 'created_at' && key !== 'updated_at') {
              totalFields++;
              if (value) completedFields++;
            }
          });
          
          setProfileCompletion(Math.round((completedFields / totalFields) * 100));
        } else {
          setProfileCompletion(0);
        }
        
        // Fetch recent applications
        const { data: applications } = await supabase
          .from('applications')
          .select(`
            *,
            job_listings:job_id (
              title, 
              type,
              employer_id,
              employer_profiles:employer_id (company_name)
            )
          `)
          .eq('student_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);
          
        setRecentApplications(applications || []);
        
        // Fetch recommended jobs (simplified for MVP - just recent jobs)
        const { data: jobs } = await supabase
          .from('job_listings')
          .select(`
            *,
            employer_profiles:employer_id (company_name)
          `)
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(3);
          
        setRecommendedJobs(jobs || []);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
        <h1 className="text-2xl font-bold font-display text-neutral-900">Student Dashboard</h1>
      </div>

      {/* Profile Completion */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-900 mb-2">Complete Your Profile</h2>
            <p className="text-primary-700 mb-4">A complete profile increases your chances of getting noticed by employers.</p>
            <div className="w-full bg-white rounded-full h-2.5">
              <div 
                className="bg-primary-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <p className="text-sm text-primary-700 mt-2">Profile Completion: {profileCompletion}%</p>
          </div>
          <div className="shrink-0">
            <Button 
              variant="primary"
              onClick={() => {}}
              rightIcon={<ArrowRight size={16} />}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-complementary-100 rounded-full flex items-center justify-center text-complementary-500 mb-4">
              <FileCheck size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{recentApplications.length}</h3>
            <p className="text-neutral-600">Applications</p>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mb-4">
              <Briefcase size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">0</h3>
            <p className="text-neutral-600">Interviews</p>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-500 mb-4">
              <Award size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">0</h3>
            <p className="text-neutral-600">Offers</p>
          </div>
        </Card>
      </div>

      {/* Recent Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Recent Applications</h2>
          <Link to="/applications" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {recentApplications.length > 0 ? (
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <Card key={app.id} hover>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{app.job_listings.title}</h3>
                    <p className="text-neutral-600 text-sm">{app.job_listings.employer_profiles.company_name}</p>
                  </div>
                  <div className="mt-3 md:mt-0 flex items-center">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      app.status === 'pending' ? 'bg-neutral-100 text-neutral-600' : 
                      app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                      app.status === 'shortlisted' ? 'bg-complementary-100 text-complementary-700' :
                      app.status === 'rejected' ? 'bg-error/10 text-error' :
                      'bg-success/10 text-success'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                    <Button 
                      variant="text" 
                      size="sm"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-6">
              <p className="text-neutral-600">You haven't applied to any jobs yet.</p>
              <Button 
                variant="primary"
                className="mt-4"
                onClick={() => {}}
              >
                Browse Jobs
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Recommended Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Recommended For You</h2>
          <Link to="/jobs" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {recommendedJobs.length > 0 ? (
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <Card key={job.id} hover>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{job.title}</h3>
                    <p className="text-neutral-600 text-sm">{job.employer_profiles.company_name}</p>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-3 md:mt-0"
                  >
                    View Job
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-6">
              <p className="text-neutral-600">No recommended jobs available yet.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Learning Resources (Placeholder for future development) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Learning Resources</h2>
        </div>
        
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-1">Resume Building Workshop</h3>
              <p className="text-neutral-600 text-sm">Learn how to create an impressive resume that stands out to employers.</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="ml-auto"
            >
              Learn More
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;