import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function UserButton({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    setIsOpen(false);
    // Clear any user data from localStorage if needed
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Redirect to home page
    router.push('/');
    toast.success('Signed out successfully');
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user || !user.username) return '?';
    return user.username.charAt(0).toUpperCase();
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user?.avatar ? (
          <div className="h-10 w-10 relative rounded-full overflow-hidden border-2 border-teal-500/50 group-hover:border-teal-500 transition-colors">
            <Image
              src={user.avatar}
              alt={user.username || 'User'}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center text-beige-500 font-bold text-lg border-2 border-teal-500/50 group-hover:border-teal-500 transition-colors">
            {getInitials()}
          </div>
        )}

        <span className="ml-2 text-beige-500 group-hover:text-teal-500 transition-colors hidden sm:block">
          {user?.username || 'User'}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-2 h-5 w-5 text-beige-600 group-hover:text-teal-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-700 border border-teal-700/30 shadow-lg z-50 overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-4 border-b border-teal-700/20">
              <div className="flex items-center">
                {user?.avatar ? (
                  <div className="h-10 w-10 relative rounded-full overflow-hidden border-2 border-teal-500/50">
                    <Image
                      src={user.avatar}
                      alt={user.username || 'User'}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center text-beige-500 font-bold text-lg">
                    {getInitials()}
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-beige-500">{user?.username || 'User'}</p>
                  <p className="text-xs text-beige-600 truncate">{user?.email || ''}</p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <Link
                href={user?._id ? `/dashboard/${user._id}` : user?.id ? `/dashboard/${user.id}` : '/'}
                className="flex items-center px-4 py-2 text-sm text-beige-500 hover:bg-teal-500/10 hover:text-teal-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Dashboard
              </Link>

              <Link
                href={user?.username ? `/u/${user.username}` : user?.id ? `/u/${user.id}` : '/'}
                className="flex items-center px-4 py-2 text-sm text-beige-500 hover:bg-teal-500/10 hover:text-teal-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                My Public Links
              </Link>


            </div>

            <div className="py-1 border-t border-teal-700/20">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-4 py-2 text-sm text-beige-500 hover:bg-danger-500/10 hover:text-danger-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
