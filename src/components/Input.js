import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  className = '',
  fullWidth = true,
  icon,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const labelVariants = {
    default: { y: 0, scale: 1 },
    focused: { y: -4, scale: 0.9, color: '#48A6A7' }
  };

  const inputVariants = {
    default: { boxShadow: '0 0 0 0 rgba(72, 166, 167, 0)' },
    hover: { boxShadow: '0 0 0 2px rgba(72, 166, 167, 0.1)' },
    focused: { boxShadow: '0 0 0 2px rgba(72, 166, 167, 0.3)' },
    error: { boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.3)' }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto', transition: { type: 'spring', stiffness: 500, damping: 30 } }
  };

  // Determine the current animation state
  const getInputState = () => {
    if (error) return 'error';
    if (isFocused) return 'focused';
    if (isHovered) return 'hover';
    return 'default';
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className} relative mb-5`}>
      {label && (
        <motion.label
          htmlFor={id}
          className="block text-sm font-medium text-beige-600 mb-1 ml-1 origin-left transition-all duration-200"
          variants={labelVariants}
          initial="default"
          animate={isFocused || props.value ? 'focused' : 'default'}
        >
          {label}
        </motion.label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beige-600">
            {icon}
          </div>
        )}

        <motion.div
          className="relative"
          variants={inputVariants}
          initial="default"
          animate={getInputState()}
        >
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`
              w-full px-4 py-2.5 rounded-xl
              bg-dark-700/50 border border-teal-700/30
              text-beige-500 placeholder-beige-600/50
              focus:outline-none focus:ring-0 focus:border-teal-500
              transition-all duration-200
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-danger-500' : ''}
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
          />

          {/* Animated focus ring */}
          <motion.div
            className={`absolute inset-0 rounded-xl pointer-events-none ${error ? 'bg-danger-500/5' : 'bg-teal-500/5'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </div>

      <motion.div
        variants={errorVariants}
        initial="hidden"
        animate={error ? 'visible' : 'hidden'}
        className="overflow-hidden"
      >
        {error && (
          <p className="mt-1.5 text-sm text-danger-500 flex items-center ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        )}
      </motion.div>
    </div>
  );
}
