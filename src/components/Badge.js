import React from 'react';

export default function Badge({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  dot = false,
  ...props
}) {
  // Define variant classes
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-success-100 text-success-800',
    danger: 'bg-danger-100 text-danger-800',
    warning: 'bg-amber-100 text-amber-800',
    info: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  
  // Define size classes
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };
  
  return (
    <span 
      className={`
        inline-flex items-center rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span 
          className={`
            mr-1.5 h-2 w-2 rounded-full
            ${variant === 'primary' ? 'bg-primary-600' : ''}
            ${variant === 'secondary' ? 'bg-secondary-600' : ''}
            ${variant === 'success' ? 'bg-success-600' : ''}
            ${variant === 'danger' ? 'bg-danger-600' : ''}
            ${variant === 'warning' ? 'bg-amber-600' : ''}
            ${variant === 'info' ? 'bg-blue-600' : ''}
            ${variant === 'gray' ? 'bg-gray-600' : ''}
          `}
        />
      )}
      {children}
    </span>
  );
}
