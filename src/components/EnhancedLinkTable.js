import React, { useState } from 'react';
import Badge from './Badge';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import { motion, AnimatePresence } from 'framer-motion';

export default function EnhancedLinkTable({
  links = [],
  isLoading = false,
  onCopy,
  onGenerateQR,
  onToggleStatus,
  onDelete,
  baseUrl,
  onAddLink,
}) {
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Sort links based on current sort settings
  const sortedLinks = [...links].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle dates
    if (sortBy === 'createdAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (isLoading) {
    return <LoadingState type="table" className="mt-4" />;
  }

  if (links.length === 0) {
    return (
      <EmptyState
        title="No links yet"
        description="Create your first shortened link to get started."
        icon={
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        }
        action={onAddLink}
        actionText="Create Link"
      />
    );
  }

  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      className="overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }}
    >
      <motion.div
        className="bg-gradient-to-br from-dark-800 to-dark-700 border border-teal-700/30 rounded-xl shadow-lg overflow-hidden"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="min-w-full divide-y divide-teal-700/20">
          <thead>
            <tr className="bg-dark-700/50">
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-beige-500 uppercase tracking-wider cursor-pointer hover:text-teal-500 transition-colors"
                onClick={() => handleSort('status')}
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 2 }}
                >
                  Status
                  {sortBy === 'status' && (
                    <motion.span
                      className="ml-1 text-teal-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </motion.span>
                  )}
                </motion.div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-beige-500 uppercase tracking-wider cursor-pointer hover:text-teal-500 transition-colors"
                onClick={() => handleSort('title')}
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 2 }}
                >
                  Title
                  {sortBy === 'title' && (
                    <motion.span
                      className="ml-1 text-teal-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </motion.span>
                  )}
                </motion.div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-beige-500 uppercase tracking-wider"
              >
                Short URL
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-beige-500 uppercase tracking-wider cursor-pointer hover:text-teal-500 transition-colors"
                onClick={() => handleSort('clicks')}
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 2 }}
                >
                  Clicks
                  {sortBy === 'clicks' && (
                    <motion.span
                      className="ml-1 text-teal-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </motion.span>
                  )}
                </motion.div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-beige-500 uppercase tracking-wider cursor-pointer hover:text-teal-500 transition-colors"
                onClick={() => handleSort('createdAt')}
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 2 }}
                >
                  Created
                  {sortBy === 'createdAt' && (
                    <motion.span
                      className="ml-1 text-teal-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </motion.span>
                  )}
                </motion.div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-medium text-beige-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-700/10">
            <AnimatePresence>
              {sortedLinks.map((link, index) => (
                <motion.tr
                  key={link._id}
                  className="hover:bg-dark-600/50 transition-colors"
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  layoutId={link._id}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        link.status === 'active'
                          ? 'bg-teal-700/20 text-teal-500'
                          : 'bg-red-700/20 text-red-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.span
                        className={`h-2 w-2 rounded-full mr-1.5 ${
                          link.status === 'active' ? 'bg-teal-500' : 'bg-red-500'
                        }`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      ></motion.span>
                      {link.status === 'active' ? 'Active' : 'Inactive'}
                    </motion.span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-beige-500">{link.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {link.shortCode ? (
                      <div className="flex items-center">
                        <a
                          href={`${baseUrl}${link.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-teal-500 hover:text-teal-400 transition-colors"
                        >
                          {`${baseUrl}${link.shortCode}`}
                        </a>
                        <motion.button
                          onClick={() => onCopy(link.shortCode)}
                          className="ml-2 text-beige-600 hover:text-teal-500 transition-colors"
                          title="Copy to clipboard"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </motion.button>
                      </div>
                    ) : (
                      <span className="text-sm text-beige-600">No short URL</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.div
                      className="text-sm font-semibold text-teal-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + (index * 0.05) }}
                    >
                      {link.clicks || 0}
                    </motion.div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-beige-600">
                      {new Date(link.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-4">
                      <motion.button
                        onClick={() => onGenerateQR(link.shortCode)}
                        className="text-beige-600 hover:text-teal-500 transition-colors"
                        title="Generate QR Code"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                      </motion.button>

                      <motion.button
                        onClick={() => onToggleStatus(link._id, link.status)}
                        className={`transition-colors ${
                          link.status === 'active'
                            ? 'text-beige-600 hover:text-red-500'
                            : 'text-beige-600 hover:text-teal-500'
                        }`}
                        title={link.status === 'active' ? 'Deactivate' : 'Activate'}
                        whileHover={{ scale: 1.2, rotate: link.status === 'active' ? -5 : 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {link.status === 'active' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </motion.button>

                      <motion.button
                        onClick={() => onDelete(link._id, link.title)}
                        className="text-beige-600 hover:text-red-500 transition-colors"
                        title="Delete"
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
