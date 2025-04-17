import React from 'react';
import Button from './Button';
import { motion } from 'framer-motion';

export default function EmptyState({
  title = 'No data found',
  description = 'Get started by creating your first item.',
  icon,
  action,
  actionText = 'Create New',
  className = '',
}) {
  return (
    <motion.div
      className={`text-center py-12 ${className} bg-gradient-to-br from-dark-800 to-dark-700 border border-teal-700/30 rounded-xl shadow-lg p-10`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }}
    >
      {icon && (
        <motion.div
          className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-teal-700/20 text-teal-500 mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.3
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {icon}
          </motion.div>
        </motion.div>
      )}

      <motion.h3
        className="text-2xl font-bold text-beige-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="mt-4 text-beige-600 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {description}
      </motion.p>

      {action && (
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={action} variant="primary" className="px-8 py-3 shadow-lg">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </motion.svg>
            {actionText}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
