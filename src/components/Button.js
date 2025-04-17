import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  icon,
  ...props
}) {
  // Define size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg',
  };

  // Define variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 hover:from-teal-500 hover:to-teal-400 shadow-lg hover:shadow-teal-500/20',
    secondary: 'bg-dark-700 text-beige-500 hover:bg-dark-600 border border-teal-700/30 shadow-md',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-400 text-beige-500 hover:from-accent-400 hover:to-accent-300 shadow-lg hover:shadow-accent-500/20',
    outline: 'border border-teal-700/50 bg-transparent text-teal-500 hover:bg-teal-500/10',
    danger: 'bg-gradient-to-r from-danger-600 to-danger-500 text-white hover:from-danger-500 hover:to-danger-400 shadow-lg hover:shadow-danger-500/20',
    success: 'bg-gradient-to-r from-success-600 to-success-500 text-white hover:from-success-500 hover:to-success-400 shadow-lg hover:shadow-success-500/20',
    ghost: 'bg-transparent hover:bg-dark-700/50 text-beige-600 hover:text-beige-500',
  };

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
    disabled: { opacity: 0.6 }
  };

  // Loading spinner animation
  const spinnerVariants = {
    initial: { opacity: 0, scale: 0.5, rotate: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 360,
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 1,
          ease: "linear"
        },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    }
  };

  // Combine all classes
  const buttonClasses = `
    inline-flex items-center justify-center
    font-medium rounded-xl
    transition-all duration-300
    focus:outline-none
    disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Button content with loading state
  const ButtonContent = () => (
    <>
      {isLoading ? (
        <motion.svg
          className="-ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          variants={spinnerVariants}
          initial="initial"
          animate="animate"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </motion.svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a
          className={buttonClasses}
          variants={buttonVariants}
          initial="initial"
          whileHover={!disabled && !isLoading ? "hover" : undefined}
          whileTap={!disabled && !isLoading ? "tap" : undefined}
          animate={disabled || isLoading ? "disabled" : "initial"}
          {...props}
        >
          <ButtonContent />
        </motion.a>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || isLoading}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !isLoading ? "hover" : undefined}
      whileTap={!disabled && !isLoading ? "tap" : undefined}
      animate={disabled || isLoading ? "disabled" : "initial"}
      {...props}
    >
      <ButtonContent />
    </motion.button>
  );
}
