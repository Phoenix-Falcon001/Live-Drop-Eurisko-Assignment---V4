import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";
  
  const styles = {
    primary: 'bg-primary text-white hover:bg-blue-700 shadow-md',
    secondary: 'bg-secondary text-white hover:bg-orange-600 shadow-md',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent text-primary hover:bg-blue-50',
  };

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};