import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import supabase from '../../lib/supabaseClient';
import { AlertCircle } from 'lucide-react';

interface InterestsFormData {
  interests: string[];
  techStack: string[];
  rolePreference: string[];
}

interface AchievementsFormData {
  pastAccomplishments: string[];
  currentProjects: string[];
  futurePlans: string[];
}

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  
  const [achievements, setAchievements] = useState<AchievementsFormData>({
    pastAccomplishments: [''],
    currentProjects: [''],
    futurePlans: [''],
  });

  // Predefined options
  const interestOptions = [
    'Web Development', 'Mobile Development', 'AI/ML', 'Data Science',
    'DevOps', 'Cloud Computing', 'Cybersecurity', 'Blockchain',
    'UI/UX Design', 'Game Development', 'IoT', 'AR/VR'
  ];

  const techStackOptions = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'React',
    'Node.js', 'Angular', 'Vue.js', 'Django', 'Spring Boot',
    'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL'
  ];

  const roleOptions = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Mobile Developer', 'DevOps Engineer', 'Data Scientist',
    'UI/UX Designer', 'Product Manager', 'QA Engineer'
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleTechStackToggle = (tech: string) => {
    setSelectedTechStack(prev => 
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleAchievementChange = (
    field: keyof AchievementsFormData,
    index: number,
    value: string
  ) => {
    setAchievements(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addAchievementField = (field: keyof AchievementsFormData) => {
    setAchievements(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeAchievementField = (field: keyof AchievementsFormData, index: number) => {
    setAchievements(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleInterestsSubmit = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('user_interests')
        .insert([{
          user_id: user.id,
          interests: selectedInterests,
          tech_stack: selectedTechStack,
          role_preference: selectedRoles
        }]);

      if (error) throw error;

      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to save interests');
      console.error('Error saving interests:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAchievementsSubmit = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('user_achievements')
        .insert([{
          user_id: user.id,
          past_accomplishments: achievements.pastAccomplishments.filter(Boolean),
          current_projects: achievements.currentProjects.filter(Boolean),
          future_plans: achievements.futurePlans.filter(Boolean)
        }]);

      if (error) throw error;

      // Update user profile as completed
      const { error: updateError } = await supabase
        .from('users')
        .update({ profile_completed: true })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Redirect to dashboard based on role
      navigate(userRole === 'student' ? '/dashboard/student' : '/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save achievements');
      console.error('Error saving achievements:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 1 ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-500'
              }`}>
                1
              </div>
              <div className="w-16 h-1 bg-primary-100"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 2 ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-500'
              }`}>
                2
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-error/10 text-error p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {step === 1 ? (
            <Card>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Select Your Interests</h1>
                
                {/* Interests */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Areas of Interest</h2>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map(interest => (
                      <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedInterests.includes(interest)
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {techStackOptions.map(tech => (
                      <button
                        key={tech}
                        onClick={() => handleTechStackToggle(tech)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedTechStack.includes(tech)
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role Preferences */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Preferred Roles</h2>
                  <div className="flex flex-wrap gap-2">
                    {roleOptions.map(role => (
                      <button
                        key={role}
                        onClick={() => handleRoleToggle(role)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedRoles.includes(role)
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleInterestsSubmit}
                  isLoading={isLoading}
                  disabled={
                    selectedInterests.length === 0 ||
                    selectedTechStack.length === 0 ||
                    selectedRoles.length === 0
                  }
                >
                  Continue
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Tell Us About Yourself</h1>

                {/* Past Accomplishments */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Past Accomplishments</h2>
                  {achievements.pastAccomplishments.map((accomplishment, index) => (
                    <div key={index} className="mb-4 flex gap-2">
                      <textarea
                        value={accomplishment}
                        onChange={(e) => handleAchievementChange('pastAccomplishments', index, e.target.value)}
                        className="flex-1 min-h-[100px] p-3 border border-neutral-300 rounded-md"
                        placeholder="Tell us about your achievements..."
                      />
                      {index > 0 && (
                        <button
                          onClick={() => removeAchievementField('pastAccomplishments', index)}
                          className="text-error hover:text-error-dark"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addAchievementField('pastAccomplishments')}
                  >
                    Add Another Accomplishment
                  </Button>
                </div>

                {/* Current Projects */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Current Projects</h2>
                  {achievements.currentProjects.map((project, index) => (
                    <div key={index} className="mb-4 flex gap-2">
                      <textarea
                        value={project}
                        onChange={(e) => handleAchievementChange('currentProjects', index, e.target.value)}
                        className="flex-1 min-h-[100px] p-3 border border-neutral-300 rounded-md"
                        placeholder="What are you working on currently?"
                      />
                      {index > 0 && (
                        <button
                          onClick={() => removeAchievementField('currentProjects', index)}
                          className="text-error hover:text-error-dark"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addAchievementField('currentProjects')}
                  >
                    Add Another Project
                  </Button>
                </div>

                {/* Future Plans */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Future Plans</h2>
                  {achievements.futurePlans.map((plan, index) => (
                    <div key={index} className="mb-4 flex gap-2">
                      <textarea
                        value={plan}
                        onChange={(e) => handleAchievementChange('futurePlans', index, e.target.value)}
                        className="flex-1 min-h-[100px] p-3 border border-neutral-300 rounded-md"
                        placeholder="What are your future career goals?"
                      />
                      {index > 0 && (
                        <button
                          onClick={() => removeAchievementField('futurePlans', index)}
                          className="text-error hover:text-error-dark"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addAchievementField('futurePlans')}
                  >
                    Add Another Plan
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAchievementsSubmit}
                    isLoading={isLoading}
                    disabled={
                      !achievements.pastAccomplishments[0] ||
                      !achievements.currentProjects[0] ||
                      !achievements.futurePlans[0]
                    }
                  >
                    Complete Profile
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OnboardingPage;