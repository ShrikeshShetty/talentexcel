import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import VerifyOTPPage from './pages/auth/VerifyOTPPage';
import OnboardingPage from './pages/auth/OnboardingPage';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/dashboard/Dashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import EmployerDashboard from './pages/dashboard/EmployerDashboard';
import TPODashboard from './pages/dashboard/TPODashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import JobListings from './pages/jobs/JobListings';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path="student" element={<StudentDashboard />} />
            <Route path="employer" element={<EmployerDashboard />} />
            <Route path="tpo" element={<TPODashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;