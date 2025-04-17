import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Logo from './Logo';
import UserButton from './UserButton';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function DashboardLayout({
  children,
  title = 'Dashboard | TinyHost',
  user = null,
  activePage = 'Dashboard'
}) {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState(activePage);

  const handleNavigation = (page) => {
    setActiveNav(page);
    // Close mobile sidebar if open
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }

    // Handle navigation based on the page
    switch (page) {
      case 'Dashboard':
        router.push('/dashboard/' + (user?.id || router.query.slug));
        break;
      case 'Links':
        router.push('/dashboard/' + (user?.id || router.query.slug) + '/links');
        break;
      case 'Analytics':
        router.push('/dashboard/' + (user?.id || router.query.slug) + '/analytics');
        break;
      case 'QR Codes':
        router.push('/dashboard/' + (user?.id || router.query.slug) + '/qrcodes');
        break;
      case 'Settings':
        router.push('/dashboard/' + (user?.id || router.query.slug) + '/settings');
        break;
      default:
        break;
    }
  };

  const handleSignOut = () => {
    router.push('/');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const mobileSidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const sidebarVariants = {
    open: { width: '240px', transition: { duration: 0.3 } },
    closed: { width: '80px', transition: { duration: 0.3 } }
  };

  const textVariants = {
    open: { opacity: 1, x: 0, display: 'block', transition: { duration: 0.2, delay: 0.1 } },
    closed: { opacity: 0, x: -10, transitionEnd: { display: 'none' }, transition: { duration: 0.2 } }
  };

  const getNavItems = () => [
    {
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      active: activeNav === 'Dashboard'
    },
    {
      name: 'Links',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      active: activeNav === 'Links'
    },
    {
      name: 'Analytics',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16V7m4 9V3m4 13v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      active: activeNav === 'Analytics'
    },
    {
      name: 'QR Codes',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm12 0h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1ZM5 20h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      active: activeNav === 'QR Codes'
    },

  ];

  const navItems = getNavItems();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-dark-900 flex">
        {/* Mobile sidebar backdrop */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile sidebar */}
        <motion.div
          className="fixed top-0 left-0 h-full w-72 bg-dark-800/90 backdrop-blur-sm border-r border-teal-700/20 shadow-xl z-50 lg:hidden"
          variants={mobileSidebarVariants}
          initial="closed"
          animate={isMobileSidebarOpen ? "open" : "closed"}
        >
          <div className="flex items-center justify-between p-5 border-b border-teal-700/20">
            <Logo className="text-teal-500" linkToHome={false} />
            <button
              className="text-beige-500 hover:text-teal-500 focus:outline-none"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-5 h-full overflow-y-auto">
            {user && (
              <div className="flex items-center space-x-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-beige-500 font-semibold shadow-md">
                  {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="text-beige-500 font-medium">{user.username || 'User'}</div>
                  <div className="text-beige-600 text-xs flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-teal-500 mr-1"></span>
                    Pro Account
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-xs font-semibold text-beige-600 uppercase tracking-wider">Main Menu</h3>
            </div>

            <nav className="space-y-1 mb-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.name)}
                  className={`flex items-center w-full px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.active ? 'bg-gradient-to-r from-teal-700/20 to-teal-500/10 text-teal-500 shadow-sm' : 'text-beige-500 hover:bg-dark-700/50 hover:text-teal-500'}`}
                >
                  <div className={`${item.active ? 'bg-teal-500/20' : 'bg-dark-700/50'} p-2 rounded-lg`}>
                    {item.icon}
                  </div>
                  <span className="ml-3">{item.name}</span>
                  {item.active && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-teal-500" />
                  )}
                </button>
              ))}
            </nav>

            <div className="mb-4">
              <h3 className="text-xs font-semibold text-beige-600 uppercase tracking-wider">General</h3>
            </div>

            <nav className="space-y-1 mb-8">
              <button
                onClick={() => handleNavigation('Settings')}
                className={`flex items-center w-full px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-beige-500 hover:bg-dark-700/50 hover:text-teal-500 ${activeNav === 'Settings' ? 'bg-gradient-to-r from-teal-700/20 to-teal-500/10 text-teal-500 shadow-sm' : ''}`}
              >
                <div className={`${activeNav === 'Settings' ? 'bg-teal-500/20' : 'bg-dark-700/50'} p-2 rounded-lg`}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="ml-3">Settings</span>
                {activeNav === 'Settings' && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-teal-500" />
                )}
              </button>

              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-beige-500 hover:bg-dark-700/50 hover:text-teal-500"
              >
                <div className="bg-dark-700/50 p-2 rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="ml-3">Sign Out</span>
              </button>
            </nav>

            <div className="mt-auto">
              <div className="bg-gradient-to-br from-teal-700/20 to-teal-500/10 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/10 rounded-full -mr-6 -mt-6 blur-xl"></div>
                <h4 className="text-beige-500 font-medium mb-2">Upgrade to Pro</h4>
                <p className="text-beige-600 text-xs mb-3">Get more features and premium support</p>
                <button
                  onClick={() => handleNavigation('Settings')}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg py-2 text-sm font-medium shadow-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 11h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop sidebar */}
        <motion.div
          className="hidden lg:block bg-dark-800/90 backdrop-blur-sm border-r border-teal-700/20 shadow-lg overflow-hidden"
          variants={sidebarVariants}
          initial="open"
          animate={isSidebarOpen ? "open" : "closed"}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-teal-700/20">
              <motion.div variants={textVariants}>
                <Logo className="text-teal-500" linkToHome={false} />
              </motion.div>

              <button
                className="text-beige-500 hover:text-teal-500 focus:outline-none"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex-1 py-6 overflow-y-auto">
              {user && (
                <div className={`flex items-center ${isSidebarOpen ? 'px-5 space-x-3' : 'justify-center'} mb-8`}>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-beige-500 font-semibold flex-shrink-0 shadow-md">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <motion.div variants={textVariants}>
                    <div className="text-beige-500 font-medium">{user.username || 'User'}</div>
                    <div className="text-beige-600 text-xs flex items-center">
                      <span className="inline-block h-2 w-2 rounded-full bg-teal-500 mr-1"></span>
                      Pro Account
                    </div>
                  </motion.div>
                </div>
              )}

              <div className={`${isSidebarOpen ? 'px-5' : 'px-2'} mb-4`}>
                <motion.div variants={textVariants}>
                  <h3 className="text-xs font-semibold text-beige-600 uppercase tracking-wider">Main Menu</h3>
                </motion.div>
              </div>

              <nav className="px-2 space-y-1 mb-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.name)}
                    className={`flex items-center w-full ${isSidebarOpen ? 'px-3' : 'justify-center px-2'} py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.active ? 'bg-gradient-to-r from-teal-700/20 to-teal-500/10 text-teal-500 shadow-sm' : 'text-beige-500 hover:bg-dark-700/50 hover:text-teal-500'}`}
                  >
                    <div className={`${item.active ? 'bg-teal-500/20' : 'bg-dark-700/50'} p-2 rounded-lg`}>
                      {item.icon}
                    </div>
                    <motion.span className={`ml-3 ${isSidebarOpen ? '' : 'hidden'}`} variants={textVariants}>
                      {item.name}
                    </motion.span>
                    {item.active && isSidebarOpen && (
                      <motion.div
                        className="ml-auto h-2 w-2 rounded-full bg-teal-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    )}
                  </button>
                ))}
              </nav>

              <div className={`${isSidebarOpen ? 'px-5' : 'px-2'} mb-4`}>
                <motion.div variants={textVariants}>
                  <h3 className="text-xs font-semibold text-beige-600 uppercase tracking-wider">General</h3>
                </motion.div>
              </div>

              <nav className="px-2 space-y-1">
                <button
                  onClick={() => handleNavigation('Settings')}
                  className={`flex items-center w-full ${isSidebarOpen ? 'px-3' : 'justify-center px-2'} py-3 text-sm font-medium rounded-xl transition-all duration-200 text-beige-500 hover:bg-dark-700/50 hover:text-teal-500 ${activeNav === 'Settings' ? 'bg-gradient-to-r from-teal-700/20 to-teal-500/10 text-teal-500 shadow-sm' : ''}`}
                >
                  <div className={`${activeNav === 'Settings' ? 'bg-teal-500/20' : 'bg-dark-700/50'} p-2 rounded-lg`}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <motion.span className={`ml-3 ${isSidebarOpen ? '' : 'hidden'}`} variants={textVariants}>
                    Settings
                  </motion.span>
                  {activeNav === 'Settings' && isSidebarOpen && (
                    <motion.div
                      className="ml-auto h-2 w-2 rounded-full bg-teal-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  )}
                </button>

                <button
                  onClick={handleSignOut}
                  className={`flex items-center w-full ${isSidebarOpen ? 'px-3' : 'justify-center px-2'} py-3 text-sm font-medium rounded-xl transition-all duration-200 text-beige-500 hover:bg-dark-700/50 hover:text-teal-500`}
                >
                  <div className="bg-dark-700/50 p-2 rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <motion.span className={`ml-3 ${isSidebarOpen ? '' : 'hidden'}`} variants={textVariants}>
                    Sign Out
                  </motion.span>
                </button>
              </nav>
            </div>

            {isSidebarOpen && (
              <div className="p-5 border-t border-teal-700/20">
                <div className="bg-gradient-to-br from-teal-700/20 to-teal-500/10 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/10 rounded-full -mr-6 -mt-6 blur-xl"></div>
                  <h4 className="text-beige-500 font-medium mb-2">Upgrade to Pro</h4>
                  <p className="text-beige-600 text-xs mb-3">Get more features and premium support</p>
                  <button
                    onClick={() => handleNavigation('Settings')}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg py-2 text-sm font-medium shadow-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 11h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-dark-800/80 backdrop-blur-sm border-b border-teal-700/20 shadow-md sticky top-0 z-10">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    className="text-beige-500 hover:text-teal-500 focus:outline-none lg:hidden"
                    onClick={() => setIsMobileSidebarOpen(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <div className="ml-4 lg:hidden">
                    <Logo className="text-teal-500" linkToHome={false} />
                  </div>
                  <div className="hidden lg:flex items-center space-x-2">
                    <h1 className="text-xl font-bold text-beige-500">{activeNav}</h1>
                    <span className="text-teal-500 bg-teal-500/10 px-2 py-1 rounded-md text-xs font-medium">Overview</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative hidden sm:block">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-beige-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="block w-full pl-10 pr-3 py-2 border border-teal-700/20 rounded-lg bg-dark-700/50 text-beige-500 placeholder-beige-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyDown={(e) => e.key === 'Enter' && alert('Search functionality will be implemented in a future update')}
                    />
                  </div>

                  <button
                    onClick={() => alert('Notifications will be implemented in a future update')}
                    className="text-beige-500 hover:text-teal-500 focus:outline-none relative p-2 rounded-lg hover:bg-dark-700/50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-teal-500"></span>
                  </button>

                  {user && (
                    <UserButton user={user} />
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-dark-900 to-dark-800 p-4 sm:p-6 lg:p-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="bg-dark-800/80 backdrop-blur-sm border-t border-teal-700/20 py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-beige-600 text-sm mb-2 sm:mb-0 flex items-center">
                <Logo className="text-teal-500 mr-2 h-5" linkToHome={false} />
                <span>&copy; {new Date().getFullYear()} All rights reserved</span>
              </div>
              <div className="text-beige-600 text-sm flex space-x-6">
                <button onClick={() => alert('Terms page will be implemented in a future update')} className="hover:text-teal-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Terms
                </button>
                <button onClick={() => alert('Privacy page will be implemented in a future update')} className="hover:text-teal-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Privacy
                </button>
                <button onClick={() => alert('Support page will be implemented in a future update')} className="hover:text-teal-500 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Support
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1F1F1F',
            color: '#F2EFE7',
            border: '1px solid rgba(0, 106, 113, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#48A6A7',
              secondary: '#1F1F1F',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#1F1F1F',
            },
          },
        }}
      />
    </>
  );
}
