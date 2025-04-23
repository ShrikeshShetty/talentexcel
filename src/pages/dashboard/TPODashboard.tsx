import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, School, GraduationCap, Award, Briefcase, BarChart4 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import supabase from '../../lib/supabaseClient';

const TPODashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [collegeStats, setCollegeStats] = useState({
    totalStudents: 0,
    registeredStudents: 0,
    totalPlacements: 0,
    activeOpportunities: 0
  });
  const [recentPlacements, setRecentPlacements] = useState<any[]>([]);

  useEffect(() => {
    // For MVP, we're using mock data since the full implementation would require more tables
    // and relationships than necessary for the initial version
    const loadMockData = () => {
      setCollegeStats({
        totalStudents: 2500,
        registeredStudents: 850,
        totalPlacements: 320,
        activeOpportunities: 45
      });

      setRecentPlacements([
        {
          id: 1,
          student_name: 'Rohan Sharma',
          position: 'Software Engineer',
          company: 'TechCorp',
          package: '12 LPA',
          date: '2023-05-15'
        },
        {
          id: 2,
          student_name: 'Priya Patel',
          position: 'Marketing Associate',
          company: 'BrandGenius',
          package: '8 LPA',
          date: '2023-05-10'
        },
        {
          id: 3,
          student_name: 'Aditya Kumar',
          position: 'Data Analyst',
          company: 'DataWiz',
          package: '10 LPA',
          date: '2023-05-05'
        }
      ]);

      setLoading(false);
    };

    loadMockData();
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
        <h1 className="text-2xl font-bold font-display text-neutral-900">TPO Dashboard</h1>
        <Button 
          variant="primary" 
          onClick={() => {}}
          leftIcon={<Briefcase size={18} />}
        >
          Schedule Job Fair
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mb-4">
              <School size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{collegeStats.totalStudents}</h3>
            <p className="text-neutral-600">Total Students</p>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-complementary-100 rounded-full flex items-center justify-center text-complementary-500 mb-4">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{collegeStats.registeredStudents}</h3>
            <p className="text-neutral-600">Registered Students</p>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-500 mb-4">
              <Award size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{collegeStats.totalPlacements}</h3>
            <p className="text-neutral-600">Total Placements</p>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-success mb-4">
              <Briefcase size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{collegeStats.activeOpportunities}</h3>
            <p className="text-neutral-600">Active Opportunities</p>
          </div>
        </Card>
      </div>

      {/* Placement Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Placement Progress</h2>
          <Link to="/placement-stats" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
            View Details <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-neutral-700">Overall Placement</span>
              <span className="text-sm font-medium text-neutral-700">{Math.round((collegeStats.totalPlacements / collegeStats.totalStudents) * 100)}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div 
                className="bg-primary-500 h-2.5 rounded-full" 
                style={{ width: `${(collegeStats.totalPlacements / collegeStats.totalStudents) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-neutral-700">CS Department</span>
              <span className="text-sm font-medium text-neutral-700">75%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div 
                className="bg-complementary-500 h-2.5 rounded-full" 
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-neutral-700">EE Department</span>
              <span className="text-sm font-medium text-neutral-700">65%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div 
                className="bg-accent-500 h-2.5 rounded-full" 
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-neutral-700">ME Department</span>
              <span className="text-sm font-medium text-neutral-700">50%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div 
                className="bg-success h-2.5 rounded-full" 
                style={{ width: '50%' }}
              ></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Placements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Recent Placements</h2>
          <Link to="/placements" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Package
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {recentPlacements.map((placement) => (
                <tr key={placement.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-900">{placement.student_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{placement.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{placement.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{placement.package}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {new Date(placement.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Upcoming Events</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card hover>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex flex-col items-center justify-center text-primary-500">
                <span className="text-sm font-bold">25</span>
                <span className="text-xs">May</span>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Campus Recruitment Drive</h3>
                <p className="text-sm text-neutral-600 mb-2">TechCorp is visiting for full-day recruitment for software engineering roles.</p>
                <div className="flex items-center text-xs text-neutral-500">
                  <span>9:00 AM - 5:00 PM</span>
                  <span className="mx-2">•</span>
                  <span>Main Auditorium</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card hover>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-complementary-100 rounded-lg flex flex-col items-center justify-center text-complementary-500">
                <span className="text-sm font-bold">02</span>
                <span className="text-xs">Jun</span>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Resume Building Workshop</h3>
                <p className="text-sm text-neutral-600 mb-2">Interactive session on creating effective resumes for tech industry applications.</p>
                <div className="flex items-center text-xs text-neutral-500">
                  <span>2:00 PM - 4:00 PM</span>
                  <span className="mx-2">•</span>
                  <span>Seminar Hall B</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Placement Analytics (Placeholder for future development) */}
      <Card>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
            <BarChart4 size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Placement Analytics</h3>
            <p className="text-neutral-600">
              Access detailed analytics about placement trends, salary packages, and company-wise placement statistics.
            </p>
          </div>
          <Button variant="primary">
            View Analytics
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TPODashboard;