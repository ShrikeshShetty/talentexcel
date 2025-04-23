import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-bold text-primary-500">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-neutral-900">Page Not Found</h2>
          <p className="mt-2 text-neutral-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              leftIcon={<Home size={18} />}
            >
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/jobs')}
              leftIcon={<Search size={18} />}
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;