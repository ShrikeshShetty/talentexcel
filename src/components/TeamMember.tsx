import React from 'react';
import { Linkedin, Twitter, Globe } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-4 border-white shadow-md">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" 
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{name}</h3>
        <p className="text-blue-600 font-medium mb-3">{role}</p>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-center md:justify-start space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-400 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">
            <Globe size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;