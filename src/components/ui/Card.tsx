import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md'
}) => {
  const paddingClass = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };

  const hoverClass = hover 
    ? 'transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-hover' 
    : '';

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-soft
        ${paddingClass[padding]}
        ${hoverClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;