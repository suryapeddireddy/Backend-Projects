import React from 'react';

const Button = ({ text, backgroundColor, textColor, size = "md", onClick }) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl",
  };

  return (
    <button
      onClick={onClick}
      className={`transition-all duration-300 ease-in-out transform rounded-lg ${sizeClasses[size]} 
                  ${backgroundColor} ${textColor} 
                  hover:text-white hover:scale-105 hover:shadow-lg 
                  hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600
                  border-2 border-transparent 
                  focus:outline-none focus:ring-2 focus:ring-${textColor} focus:ring-opacity-50
                  active:scale-95`}
    >
      {text}
    </button>
  );
};

export default Button;
