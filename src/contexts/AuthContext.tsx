import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type UserRole = 'student' | 'employer' | 'tpo' | 'admin' | null;

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: UserRole;
  loading: boolean;
  signUp: (email: string, password: string, role: UserRole, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  resendOTP: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    // Initial session fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }

      setUserRole(data.role as UserRole);
    } catch (error) {
      console.error('Error in fetch user role:', error);
    }
  };

  const signUp = async (email: string, password: string, role: UserRole, fullName: string) => {
    try {
      // First create the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            fullName
          },
          emailRedirectTo: `${window.location.origin}/verify-otp`
        }
      });

      if (signUpError) throw signUpError;

      if (signUpData?.user) {
        // Store the user data for later
        localStorage.setItem('registration_data', JSON.stringify({
          email,
          password,
          role,
          fullName,
          userId: signUpData.user.id
        }));

        // Send OTP for email verification
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false
          }
        });

        if (otpError) throw otpError;

        toast.success('Please check your email for the verification code');
        navigate('/verify-otp', { state: { email } });
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign up');
      console.error('Error signing up:', error);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      // Verify OTP
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) throw error;

      if (data?.user) {
        // Get the registration data
        const registrationData = JSON.parse(localStorage.getItem('registration_data') || '{}');

        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert([{ 
            id: registrationData.userId, 
            email, 
            role: registrationData.role,
            full_name: registrationData.fullName,
            profile_completed: false
          }]);

        if (profileError) throw profileError;

        // Clean up localStorage except for userId which we need in onboarding
        localStorage.removeItem('registration_data');

        toast.success('Account created successfully!');
        navigate('/onboarding');
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.message || 'Failed to verify OTP');
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  const resendOTP = async (email: string) => {
    try {
      // Resend OTP using signInWithOtp
      const { error: emailError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });

      if (emailError) throw emailError;

      toast.success('A new verification code has been sent to your email');
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend verification code');
      console.error('Error resending OTP:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        setUserRole(userData.role as UserRole);
        
        toast.success('Signed in successfully!');
        
        // Redirect based on role
        if (userData.role === 'student') {
          navigate('/dashboard/student');
        } else if (userData.role === 'employer') {
          navigate('/dashboard/employer');
        } else if (userData.role === 'tpo') {
          navigate('/dashboard/tpo');
        } else if (userData.role === 'admin') {
          navigate('/dashboard/admin');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign in');
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUserRole(null);
      navigate('/');
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign out');
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        loading,
        signUp,
        signIn,
        signOut,
        verifyOTP,
        resendOTP,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}