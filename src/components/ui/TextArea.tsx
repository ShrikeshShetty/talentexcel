import React, { useState } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  error,
  className,
  required,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="relative">
      <label 
        htmlFor={id}
        className={`block text-sm font-medium mb-1.5 transition-colors duration-200 ${
          error ? 'text-red-500' : (focused ? 'text-blue-600' : 'text-gray-700')
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        id={id}
        className={`w-full px-3 py-2.5 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
          error 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
        } ${className || ''}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextArea;