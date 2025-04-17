import React from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  className = '',
  fullWidth = true,
  ...props
}) {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`
          form-input
          ${error ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500' : ''}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
}
