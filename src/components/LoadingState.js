import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingState({
  type = 'default',
  text = 'Loading...',
  className = ''
}) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Different loading state types
  const loadingStates = {
    default: (
      <motion.div
        className={`flex flex-col items-center justify-center p-10 ${className} bg-gradient-to-br from-dark-800 to-dark-700 border border-teal-700/30 rounded-xl shadow-lg`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="rounded-full h-16 w-16 border-4 border-teal-500/30 border-t-teal-500 mb-6"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.p
          className="text-beige-500 font-medium text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      </motion.div>
    ),

    skeleton: (
      <motion.div
        className={`space-y-6 ${className} bg-gradient-to-br from-dark-800 to-dark-700 border border-teal-700/30 rounded-xl p-8 shadow-lg`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="h-6 bg-dark-600/50 rounded-lg"
          variants={itemVariants}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="h-6 bg-dark-600/50 rounded-lg w-5/6"
          variants={itemVariants}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.2
          }}
        />
        <motion.div
          className="h-6 bg-dark-600/50 rounded-lg"
          variants={itemVariants}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.4
          }}
        />
        <motion.div
          className="h-6 bg-dark-600/50 rounded-lg w-4/6"
          variants={itemVariants}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.6
          }}
        />
      </motion.div>
    ),

    card: (
      <motion.div
        className={`border border-teal-700/30 bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-8 shadow-lg ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <div className="flex space-x-6">
          <motion.div
            className="rounded-full bg-dark-600/50 h-16 w-16"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <div className="flex-1 space-y-4 py-1">
            <motion.div
              className="h-5 bg-dark-600/50 rounded-lg w-3/4"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.2
              }}
            />
            <div className="space-y-3">
              <motion.div
                className="h-5 bg-dark-600/50 rounded-lg"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.4
                }}
              />
              <motion.div
                className="h-5 bg-dark-600/50 rounded-lg w-5/6"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.6
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    ),

    table: (
      <motion.div
        className={`overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <motion.div
          className="bg-gradient-to-br from-dark-800 to-dark-700 border border-teal-700/30 rounded-xl shadow-lg overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="h-12 bg-dark-700/50 border-b border-teal-700/20"
            variants={itemVariants}
            animate={{
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`h-16 border-b border-teal-700/10 ${i === 4 ? '' : ''}`}
              variants={itemVariants}
              custom={i}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                backgroundColor: ["rgba(30, 41, 59, 0.2)", "rgba(30, 41, 59, 0.3)", "rgba(30, 41, 59, 0.2)"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    )
  };

  return loadingStates[type] || loadingStates.default;
}
