/*
  # Initial schema setup for TalentExcel platform

  1. Users and Profiles
    - `users` (extends Supabase Auth)
    - `profiles` (general user profiles)
    - `student_profiles` (student-specific data)
    - `employer_profiles` (employer-specific data)
  
  2. Jobs and Applications
    - `job_listings` (all job and internship opportunities)
    - `applications` (job applications from students)
    - `saved_jobs` (bookmarked jobs)
  
  3. Notifications
    - `notifications` (system notifications for users)

  4. Security
    - RLS policies for all tables
    - Authentication-based access control
*/

-- Create users table to extend Supabase Auth
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL,
  email text NOT NULL UNIQUE,
  role text NOT NULL CHECK (role IN ('student', 'employer', 'tpo', 'admin')),
  full_name text,
  profile_completed boolean DEFAULT false
);

-- Create general profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  avatar_url text,
  bio text,
  location text,
  website text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create student profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  college text,
  degree text,
  graduation_year integer,
  skills text[],
  resume_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create employer profiles table
CREATE TABLE IF NOT EXISTS employer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  industry text,
  company_size text,
  logo_url text,
  description text,
  website text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create job listings table
CREATE TABLE IF NOT EXISTS job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id uuid NOT NULL REFERENCES employer_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('job', 'internship')),
  location text NOT NULL,
  remote boolean DEFAULT false,
  skills_required text[],
  salary_min integer,
  salary_max integer,
  application_deadline timestamptz NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed'))
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resume_url text NOT NULL,
  cover_letter text,
  video_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'accepted')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create saved jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_id uuid NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, job_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for profiles table
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for student_profiles table
CREATE POLICY "Student profiles are viewable by everyone" ON student_profiles
  FOR SELECT USING (true);

CREATE POLICY "Students can update their own profile" ON student_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own profile" ON student_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for employer_profiles table
CREATE POLICY "Employer profiles are viewable by everyone" ON employer_profiles
  FOR SELECT USING (true);

CREATE POLICY "Employers can update their own profile" ON employer_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Employers can insert their own profile" ON employer_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for job_listings table
CREATE POLICY "Published job listings are viewable by everyone" ON job_listings
  FOR SELECT USING (status = 'published');

CREATE POLICY "Employers can view all their own job listings" ON job_listings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM employer_profiles
      WHERE employer_profiles.id = job_listings.employer_id
      AND employer_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Employers can insert their own job listings" ON job_listings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM employer_profiles
      WHERE employer_profiles.id = job_listings.employer_id
      AND employer_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Employers can update their own job listings" ON job_listings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM employer_profiles
      WHERE employer_profiles.id = job_listings.employer_id
      AND employer_profiles.user_id = auth.uid()
    )
  );

-- RLS Policies for applications table
CREATE POLICY "Students can view their own applications" ON applications
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Employers can view applications for their job listings" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM job_listings
      JOIN employer_profiles ON job_listings.employer_id = employer_profiles.id
      WHERE job_listings.id = applications.job_id
      AND employer_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can insert their own applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own applications" ON applications
  FOR UPDATE USING (auth.uid() = student_id);

-- RLS Policies for saved_jobs table
CREATE POLICY "Users can view their own saved jobs" ON saved_jobs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save jobs" ON saved_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved jobs" ON saved_jobs
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for notifications table
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_job_listings_status ON job_listings(status);
CREATE INDEX IF NOT EXISTS idx_job_listings_type ON job_listings(type);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);