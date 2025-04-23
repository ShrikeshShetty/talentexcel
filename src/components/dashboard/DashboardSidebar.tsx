import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  FileText, 
  Bell, 
  Settings, 
  LogOut,
  Building,
  Users,
  BarChart4,
  GraduationCap,
  Bookmark 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-3 py-2 px-4 rounded-md text-sm
      ${isActive 
        ? 'bg-primary-50 text-primary-600 font-medium' 
        : 'text-neutral-600 hover:bg-neutral-100 transition-colors'}
    `}
  >
    {icon}
    <span>{children}</span>
  </NavLink>
);

interface DashboardSidebarProps {
  userRole: 'student' | 'employer' | 'tpo' | 'admin' | null;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ userRole }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sticky top-20 h-[calc(100vh-5rem-2rem)]">
      <div className="flex flex-col h-full">
        <div className="space-y-1 flex-grow">
          {userRole === 'student' && (
            <>
              <SidebarLink to="/dashboard/student" icon={<GraduationCap size={18} />}>
                Dashboard
              </SidebarLink>
              <SidebarLink to="/profile" icon={<User size={18} />}>
                My Profile
              </SidebarLink>
              <SidebarLink to="/applications" icon={<FileText size={18} />}>
                My Applications
              </SidebarLink>
              <SidebarLink to="/saved-jobs" icon={<Bookmark size={18} />}>
                Saved Jobs
              </SidebarLink>
            </>
          )}

          {userRole === 'employer' && (
            <>
              <SidebarLink to="/dashboard/employer" icon={<Building size={18} />}>
                Dashboard
              </SidebarLink>
              <SidebarLink to="/profile" icon={<User size={18} />}>
                Company Profile
              </SidebarLink>
              <SidebarLink to="/manage-jobs" icon={<Briefcase size={18} />}>
                Job Listings
              </SidebarLink>
              <SidebarLink to="/applications-received" icon={<FileText size={18} />}>
                Applications
              </SidebarLink>
              <SidebarLink to="/create-job" icon={<FileText size={18} />}>
                Post New Job
              </SidebarLink>
            </>
          )}

          {userRole === 'tpo' && (
            <>
              <SidebarLink to="/dashboard/tpo" icon={<Users size={18} />}>
                Dashboard
              </SidebarLink>
              <SidebarLink to="/profile" icon={<User size={18} />}>
                College Profile
              </SidebarLink>
              <SidebarLink to="/students" icon={<GraduationCap size={18} />}>
                Students
              </SidebarLink>
              <SidebarLink to="/placement-stats" icon={<BarChart4 size={18} />}>
                Placement Stats
              </SidebarLink>
              <SidebarLink to="/job-fairs" icon={<Briefcase size={18} />}>
                Job Fairs
              </SidebarLink>
            </>
          )}

          {userRole === 'admin' && (
            <>
              <SidebarLink to="/dashboard/admin" icon={<BarChart4 size={18} />}>
                Dashboard
              </SidebarLink>
              <SidebarLink to="/admin/users" icon={<Users size={18} />}>
                Manage Users
              </SidebarLink>
              <SidebarLink to="/admin/jobs" icon={<Briefcase size={18} />}>
                Manage Jobs
              </SidebarLink>
              <SidebarLink to="/admin/colleges" icon={<Building size={18} />}>
                Manage Colleges
              </SidebarLink>
              <SidebarLink to="/admin/employers" icon={<Building size={18} />}>
                Manage Employers
              </SidebarLink>
            </>
          )}

          <SidebarLink to="/notifications" icon={<Bell size={18} />}>
            Notifications
          </SidebarLink>
          
          <SidebarLink to="/settings" icon={<Settings size={18} />}>
            Settings
          </SidebarLink>
        </div>

        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 py-2 px-4 rounded-md text-sm text-error hover:bg-error/10 transition-colors mt-4"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;