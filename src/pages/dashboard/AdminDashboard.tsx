import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Building, Bell, AlertTriangle, BarChart4 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import supabase from '../../lib/supabaseClient';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [platformStats, setPlatformStats] = useState({
    totalUsers: 0,
    students: 0,
    employers: 0,
    tpos: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<any[]>([]);

  useEffect(() => {
    // For MVP, we're using mock data since the full implementation would require more tables
    // and relationships than necessary for the initial version
    const loadMockData = async () => {
      try {
        // These queries would be implemented with real Supabase data in production
        setPlatformStats({
          totalUsers: 2500,
          students: 2000,
          employers: 350,
          tpos: 150,
          totalJobs: 500,
          activeJobs: 320,
          totalApplications: 4500
        });

        setRecentUsers([
          {
            id: 1,
            full_name: 'Arjun Reddy',
            email: 'arjun.r@example.com',
            role: 'student',
            created_at: '2023-05-15T10:30:00Z'
          },
          {
            id: 2,
            full_name: 'Neha Desai',
            email: 'neha.d@techcorp.com',
            role: 'employer',
            created_at: '2023-05-14T14:20:00Z'
          },
          {
            id: 3,
            full_name: 'Dr. Rajiv Mehta',
            email: 'rajiv.m@collegeedu.in',
            role: 'tpo',
            created_at: '2023-05-13T09:15:00Z'
          },
          {
            id: 4,
            full_name: 'Kritika Sharma',
            email: 'kritika.s@example.com',
            role: 'student',
            created_at: '2023-05-12T16:45:00Z'
          },
        ]);

        setSystemAlerts([
          {
            id: 1,
            type: 'warning',
            message: 'High server load detected during peak hours',
            details: 'Database response time increased by 40%',
            timestamp: '2023-05-15T14:30:00Z'
          },
          {
            id: 2,
            type: 'error',
            message: 'Failed login attempts exceed threshold',
            details: 'Multiple attempts from IP range 192.168.1.x',
            timestamp: '2023-05-14T23:15:00Z'
          },
          {
            id: 3,
            type: 'info',
            message: 'System update scheduled',
            details: 'Maintenance window: May 20, 02:00-04:00 UTC',
            timestamp: '2023-05-13T10:45:00Z'
          }
        ]);
      } catch (error) {
        console.error('Error loading mock data:', error);
      } finally {
        setLoading(false);
      }
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
        <h1 className="text-2xl font-bold font-display text-neutral-900">Admin Dashboard</h1>
      </div>

      {/* Platform Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{platformStats.totalUsers}</h3>
            <p className="text-neutral-600">Total Users</p>
            <div className="flex justify-between w-full mt-2 text-sm">
              <span className="text-neutral-500">Students: {platformStats.students}</span>
              <span className="text-neutral-500">Employers: {platformStats.employers}</span>
              <span className="text-neutral-500">TPOs: {platformStats.tpos}</span>
            </div>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-complementary-100 rounded-full flex items-center justify-center text-complementary-500 mb-4">
              <Briefcase size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{platformStats.totalJobs}</h3>
            <p className="text-neutral-600">Total Jobs</p>
            <div className="mt-2 text-sm text-neutral-500">
              Active: {platformStats.activeJobs} ({Math.round((platformStats.activeJobs / platformStats.totalJobs) * 100)}%)
            </div>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-500 mb-4">
              <Building size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{platformStats.employers}</h3>
            <p className="text-neutral-600">Employers</p>
            <div className="mt-2 text-sm text-neutral-500">
              With active jobs: {Math.round(platformStats.employers * 0.75)}
            </div>
          </div>
        </Card>
        
        <Card hover className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mb-4">
              <Bell size={24} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{platformStats.totalApplications}</h3>
            <p className="text-neutral-600">Applications</p>
            <div className="mt-2 text-sm text-neutral-500">
              Avg. per job: {Math.round(platformStats.totalApplications / platformStats.totalJobs)}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Users */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Recent User Registrations</h2>
          <Link to="/admin/users" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date Joined
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-900">{user.full_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'student' ? 'bg-primary-100 text-primary-800' : 
                      user.role === 'employer' ? 'bg-complementary-100 text-complementary-800' :
                      user.role === 'tpo' ? 'bg-accent-100 text-accent-800' :
                      'bg-neutral-100 text-neutral-800'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="text" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* System Alerts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">System Alerts</h2>
        </div>
        
        <div className="space-y-4">
          {systemAlerts.map((alert) => (
            <Card key={alert.id} className={`
              ${alert.type === 'warning' ? 'border-l-4 border-warning' : 
                alert.type === 'error' ? 'border-l-4 border-error' :
                'border-l-4 border-primary-500'}
            `}>
              <div className="flex items-start gap-4">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${alert.type === 'warning' ? 'bg-warning/10 text-warning' : 
                    alert.type === 'error' ? 'bg-error/10 text-error' :
                    'bg-primary-100 text-primary-500'}
                `}>
                  {alert.type === 'warning' ? <AlertTriangle size={20} /> : 
                   alert.type === 'error' ? <AlertTriangle size={20} /> :
                   <Bell size={20} />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1">{alert.message}</h3>
                  <p className="text-sm text-neutral-600">{alert.details}</p>
                  <p className="text-xs text-neutral-500 mt-2">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Analytics Overview */}
      <Card>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
            <BarChart4 size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Platform Analytics</h3>
            <p className="text-neutral-600">
              Access comprehensive analytics on user engagement, job listings, applications, and platform performance.
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

export default AdminDashboard;