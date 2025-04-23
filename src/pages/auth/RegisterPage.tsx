import React, { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, AlertCircle, Building, GraduationCap, Users } from 'lucide-react';

interface RegisterFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'employer' | 'tpo' | 'admin';
}

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const location = useLocation();
  
  const { 
    register, 
    handleSubmit, 
    watch,
    setValue,
    formState: { errors } 
  } = useForm<RegisterFormInputs>();

  const password = watch('password');

  // Check for role in query params and set it as default
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    
    if (roleParam && ['student', 'employer', 'tpo'].includes(roleParam)) {
      setValue('role', roleParam as 'student' | 'employer' | 'tpo');
    } else {
      setValue('role', 'student');
    }
  }, [location, setValue]);

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      await signUp(data.email, data.password, data.role, data.fullName);
      // OTP verification is handled by AuthContext, which will redirect to verify-otp page
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-display text-neutral-900">Join TalentExcel</h1>
            <p className="mt-2 text-sm text-neutral-600">
              Create your account and start your career journey
            </p>
          </div>
          
          {error && (
            <div className="bg-error/10 text-error p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.fullName ? 'border-error' : 'border-neutral-300'
                    } placeholder-neutral-500 text-neutral-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    placeholder="Your full name"
                    {...register('fullName', { 
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-error">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.email ? 'border-error' : 'border-neutral-300'
                    } placeholder-neutral-500 text-neutral-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    placeholder="you@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.password ? 'border-error' : 'border-neutral-300'
                    } placeholder-neutral-500 text-neutral-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    placeholder="Create a password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-error">{errors.password.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.confirmPassword ? 'border-error' : 'border-neutral-300'
                    } placeholder-neutral-500 text-neutral-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    placeholder="Confirm your password"
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  I am registering as a
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="relative">
                    <input
                      type="radio"
                      id="role-student"
                      value="student"
                      className="sr-only"
                      {...register('role', { required: true })}
                    />
                    <label
                      htmlFor="role-student"
                      className={`group cursor-pointer rounded-md border p-3 flex flex-col items-center justify-center transition-colors ${
                        watch('role') === 'student'
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <GraduationCap size={24} className={`mb-2 ${
                        watch('role') === 'student' ? 'text-primary-500' : 'text-neutral-500 group-hover:text-primary-500'
                      }`} />
                      <span className="font-medium">Student</span>
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="radio"
                      id="role-employer"
                      value="employer"
                      className="sr-only"
                      {...register('role', { required: true })}
                    />
                    <label
                      htmlFor="role-employer"
                      className={`group cursor-pointer rounded-md border p-3 flex flex-col items-center justify-center transition-colors ${
                        watch('role') === 'employer'
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <Building size={24} className={`mb-2 ${
                        watch('role') === 'employer' ? 'text-primary-500' : 'text-neutral-500 group-hover:text-primary-500'
                      }`} />
                      <span className="font-medium">Employer</span>
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="radio"
                      id="role-tpo"
                      value="tpo"
                      className="sr-only"
                      {...register('role', { required: true })}
                    />
                    <label
                      htmlFor="role-tpo"
                      className={`group cursor-pointer rounded-md border p-3 flex flex-col items-center justify-center transition-colors ${
                        watch('role') === 'tpo'
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <Users size={24} className={`mb-2 ${
                        watch('role') === 'tpo' ? 'text-primary-500' : 'text-neutral-500 group-hover:text-primary-500'
                      }`} />
                      <span className="font-medium">College/TPO</span>
                    </label>
                  </div>
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-error">Please select a role</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
                I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-500">Terms of Service</Link> and <Link to="/privacy" className="text-primary-600 hover:text-primary-500">Privacy Policy</Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isLoading}
              leftIcon={<UserPlus size={18} />}
            >
              Create Account
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-neutral-600">Already have an account?</span>{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;