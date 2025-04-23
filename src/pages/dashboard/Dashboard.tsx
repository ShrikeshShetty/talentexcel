import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // If no specific role found, redirect to appropriate dashboard
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <DashboardSidebar userRole={userRole} />
          
          <main className="bg-white shadow-md rounded-lg p-6">
            <Outlet />
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;