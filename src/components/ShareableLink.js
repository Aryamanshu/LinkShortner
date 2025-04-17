import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ShareableLink = ({ username }) => {
  const [shareableUrl, setShareableUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && username) {
      const origin = window.location.origin;
      setShareableUrl(`${origin}/u/${username}`);
    }
  }, [username]);
  
  const handleCopyLink = () => {
    if (!shareableUrl) return;
    
    navigator.clipboard.writeText(shareableUrl)
      .then(() => {
        setCopied(true);
        toast.success('Shareable link copied to clipboard');
        
        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Error copying text:', err);
        toast.error('Failed to copy link');
      });
  };
  
  return (
    <motion.div 
      className="bg-gradient-to-br from-teal-700/20 to-teal-500/10 rounded-xl p-5 border border-teal-700/30 shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
      
      <h3 className="text-lg font-semibold text-beige-500 mb-3 relative z-10">Your Shareable Links Page</h3>
      <p className="text-beige-600 text-sm mb-4 relative z-10">
        Share all your links with a single URL. Anyone with this link can view all your active shortened links.
      </p>
      
      <div className="flex items-center space-x-2 relative z-10">
        <div className="flex-1 bg-dark-800/80 border border-teal-700/20 rounded-lg px-3 py-2 overflow-hidden">
          <p className="text-beige-500 text-sm truncate">{shareableUrl}</p>
        </div>
        
        <button
          onClick={handleCopyLink}
          className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
            copied 
              ? 'bg-teal-600 text-beige-500' 
              : 'bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 hover:from-teal-500 hover:to-teal-400'
          }`}
          aria-label="Copy shareable link"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
        
        <a
          href={shareableUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-dark-700/50 text-beige-500 rounded-lg hover:bg-dark-600/50 transition-colors"
          aria-label="Open shareable link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default ShareableLink;
