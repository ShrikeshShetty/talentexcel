import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import { Menu, User, Briefcase, Bell, ChevronDown, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { user, signOut, userRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    setIsProfileMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!userRole) return '/dashboard';
    return `/dashboard/${userRole}`;
  };

  return (
    <nav className="bg-white shadow-md py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-primary-500 text-white p-2 rounded-lg mr-2">
                <Briefcase size={20} />
              </div>
              <span className="text-xl font-display font-semibold text-primary-500">TalentExcel</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/jobs" className="text-neutral-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Browse Jobs
            </Link>
            {userRole === 'employer' && (
              <Link to="/create-job" className="text-neutral-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Post a Job
              </Link>
            )}
            <Link to="/about" className="text-neutral-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About Us
            </Link>
            <Link
  to="/contact"
  className="text-neutral-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
>
  Contact Us
</Link>

          </div>

          {/* Auth buttons or profile */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 text-sm text-neutral-700 hover:text-primary-500 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
                    <User size={18} />
                  </div>
                  <span>Account</span>
                  <ChevronDown size={16} />
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                      <Link
                        to={getDashboardPath()}
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/applications"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Applications
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-neutral-100"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary-500 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2 pb-3 space-y-1">
                <Link
                  to="/jobs"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Jobs
                </Link>
                {userRole === 'employer' && (
                  <Link
                    to="/create-job"
                    className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Post a Job
                  </Link>
                )}
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>
              <div className="pt-4 pb-3 border-t border-neutral-200">
                {user ? (
                  <div className="space-y-1">
                    <Link
                      to={getDashboardPath()}
                      className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/applications"
                      className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Applications
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-error hover:bg-neutral-50"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 px-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                      fullWidth
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                      fullWidth
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;