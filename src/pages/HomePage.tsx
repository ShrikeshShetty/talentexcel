import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { Search, Briefcase, GraduationCap, Building, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-500 text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight mb-4">
                Launch Your Career With The Perfect Opportunity
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Connect with top employers, find internships, jobs, and mentorship opportunities tailored for students and recent graduates.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="flex-1" 
                  onClick={() => navigate('/jobs')}
                  leftIcon={<Search size={18} />}
                >
                  Find Opportunities
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                  onClick={() => navigate('/register')}
                >
                  Join TalentExcel
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Students collaborating" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn} className="p-6 rounded-lg">
              <p className="text-3xl md:text-4xl font-bold text-primary-500">10,000+</p>
              <p className="text-neutral-600 mt-2">Active Job Listings</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6 rounded-lg">
              <p className="text-3xl md:text-4xl font-bold text-primary-500">5,000+</p>
              <p className="text-neutral-600 mt-2">Employers</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6 rounded-lg">
              <p className="text-3xl md:text-4xl font-bold text-primary-500">25,000+</p>
              <p className="text-neutral-600 mt-2">Successful Placements</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6 rounded-lg">
              <p className="text-3xl md:text-4xl font-bold text-primary-500">500+</p>
              <p className="text-neutral-600 mt-2">Partner Colleges</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* For Each User Type Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold font-display text-neutral-900 mb-4">Tailored for Everyone</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              TalentExcel provides specialized features and resources for students, employers, and educational institutions.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* For Students */}
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-soft p-8 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-complementary-100 rounded-full flex items-center justify-center text-complementary-500 mb-6">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">For Students</h3>
              <ul className="text-neutral-600 space-y-3 mb-6">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-complementary-500 rounded-full mr-2"></div>
                  Find internships & entry-level jobs
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-complementary-500 rounded-full mr-2"></div>
                  Build a professional profile
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-complementary-500 rounded-full mr-2"></div>
                  Track application status
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-complementary-500 rounded-full mr-2"></div>
                  Connect with mentors in your field
                </li>
              </ul>
              <Button 
                variant="outline" 
                onClick={() => navigate('/register?role=student')}
              >
                Register as Student
              </Button>
            </motion.div>

            {/* For Employers */}
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-soft p-8 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mb-6">
                <Building size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">For Employers</h3>
              <ul className="text-neutral-600 space-y-3 mb-6">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                  Post jobs & internship opportunities
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                  Find qualified young talent
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                  Manage applicants efficiently
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                  Partner with educational institutions
                </li>
              </ul>
              <Button 
                variant="outline" 
                onClick={() => navigate('/register?role=employer')}
              >
                Register as Employer
              </Button>
            </motion.div>

            {/* For TPOs */}
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-soft p-8 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-500 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">For Colleges & TPOs</h3>
              <ul className="text-neutral-600 space-y-3 mb-6">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2"></div>
                  Track student placements
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2"></div>
                  Connect with hiring companies
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2"></div>
                  Organize campus drives
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2"></div>
                  Access placement analytics
                </li>
              </ul>
              <Button 
                variant="outline" 
                onClick={() => navigate('/register?role=tpo')}
              >
                Register as TPO
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-neutral-900">Featured Opportunities</h2>
            <Button 
              variant="text" 
              onClick={() => navigate('/jobs')}
              rightIcon={<span className="text-xl">&rarr;</span>}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Card 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-soft hover:shadow-hover"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-primary-500 mr-4">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Software Development Intern</h3>
                    <p className="text-neutral-500 text-sm">TechCorp Solutions</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">React</span>
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">JavaScript</span>
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">Full-time</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500 mb-4">
                  <span>Mumbai, India</span>
                  <span>₹20k - ₹25k/month</span>
                </div>
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => navigate('/jobs/1')}
                >
                  View Details
                </Button>
              </div>
            </motion.div>

            {/* Job Card 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-soft hover:shadow-hover"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-primary-500 mr-4">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Marketing Assistant</h3>
                    <p className="text-neutral-500 text-sm">GlobalBrand Inc.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">Social Media</span>
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">Content</span>
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">Part-time</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500 mb-4">
                  <span>Bangalore, India</span>
                  <span>₹15k - ₹18k/month</span>
                </div>
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => navigate('/jobs/2')}
                >
                  View Details
                </Button>
              </div>
            </motion.div>

            {/* Job Card 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-soft hover:shadow-hover"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-primary-500 mr-4">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Data Analyst</h3>
                    <p className="text-neutral-500 text-sm">Analytics Pro</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">Python</span>
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">SQL</span>
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">Full-time</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500 mb-4">
                  <span>Remote</span>
                  <span>₹30k - ₹40k/month</span>
                </div>
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => navigate('/jobs/3')}
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold font-display text-neutral-900 mb-4">Success Stories</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Hear from students and employers who found success through TalentExcel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="Student" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-neutral-500">Computer Science Student</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "TalentExcel helped me land my dream internship at a top tech company. The platform made it easy to find opportunities that matched my skills and interests."
              </p>
              <div className="flex text-complementary-500 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="Employer" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Rahul Mehta</h4>
                  <p className="text-sm text-neutral-500">HR Director, TechSphere</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "As an employer, TalentExcel has been invaluable in helping us find motivated young talent. The quality of applicants is consistently high and the platform makes the hiring process simple."
              </p>
              <div className="flex text-complementary-500 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="TPO" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Amit Verma</h4>
                  <p className="text-sm text-neutral-500">TPO, Engineering College</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "TalentExcel has revolutionized how we track and manage placements. Our students find great opportunities, and we can easily monitor their progress throughout the recruitment cycle."
              </p>
              <div className="flex text-complementary-500 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold font-display mb-4">Ready to Start Your Career Journey?</h2>
              <p className="text-lg opacity-90 mb-8">
                Join thousands of students, employers, and colleges on TalentExcel today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                  onClick={() => navigate('/register')}
                >
                  Create an Account
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                  onClick={() => navigate('/jobs')}
                >
                  Browse Opportunities
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Team collaboration" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;