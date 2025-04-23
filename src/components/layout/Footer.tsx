import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Briefcase } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and mission */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-primary-500 text-white p-2 rounded-lg mr-2">
                <Briefcase size={20} />
              </div>
              <span className="text-xl font-display font-semibold text-white">TalentExcel</span>
            </div>
            <p className="text-sm text-neutral-400 mb-4">
              Connecting students and graduates with their dream opportunities. Find internships, jobs, and mentorships to kickstart your career.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs?type=internship" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For employers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=employer" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Register as Employer
                </Link>
              </li>
              <li>
                <Link to="/create-job" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/resources/employers" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Employer Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* For colleges */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Colleges</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=tpo" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Register as TPO
                </Link>
              </li>
              <li>
                <Link to="/campus-partnerships" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Campus Partnerships
                </Link>
              </li>
              <li>
                <Link to="/resources/tpo" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  TPO Resources
                </Link>
              </li>
              <li>
                <Link to="/events/campus" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Campus Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row md:justify-between">
            <p className="text-xs text-neutral-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TalentExcel. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;