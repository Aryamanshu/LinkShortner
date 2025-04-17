import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { URI } from "@/source";
import Logo from "@/components/Logo";

export default function UserLinksPage() {
  const router = useRouter();
  const { username } = router.query;

  const [userData, setUserData] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for short links
  const [baseUrl, setBaseUrl] = useState("");

  // Set base URL for short links
  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setBaseUrl(`${origin}/s/`);
    }
  }, []);

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

  // Fetch user data and links
  useEffect(() => {
    if (!username) return;

    const fetchUserLinks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${URI}/api/getUserByUsername`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username }),
        });

        const result = await response.json();

        if (response.ok) {
          setUserData({
            username: result.data.username,
            id: result.data._id
          });

          // Filter only active links
          const activeLinks = result.data.links.filter(link => link.status === 'active');
          setLinks(activeLinks);
        } else {
          setError(result.error || "User not found");
        }
      } catch (error) {
        console.error("Error fetching user links:", error);
        setError("Failed to load user links");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserLinks();
  }, [username]);

  // Handle copying short URL to clipboard
  const handleCopyShortUrl = (shortCode) => {
    if (!shortCode) return;

    const shortUrl = `${baseUrl}${shortCode}`;
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        // Visual feedback for copy
        const element = document.getElementById(`link-${shortCode}`);
        if (element) {
          element.classList.add("bg-teal-500/20");
          setTimeout(() => {
            element.classList.remove("bg-teal-500/20");
          }, 500);
        }
      })
      .catch(err => {
        console.error('Error copying text:', err);
      });
  };

  return (
    <>
      <Head>
        <title>{username ? `${username}'s Links` : 'User Links'} | TinyHost</title>
        <meta name="description" content={`Collection of shortened links by ${username || 'user'}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        {/* Header */}
        <header className="bg-dark-800/80 backdrop-blur-sm border-b border-teal-700/20 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center group">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-2 rounded-lg shadow-lg mr-3 group-hover:shadow-teal-500/20 transition-all duration-300">
                  <Logo className="text-beige-500" size="small" linkToHome={false} />
                </div>
                <span className="text-beige-500 font-bold text-lg tracking-tight">TinyHost</span>
              </Link>

              <Link
                href="/"
                className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg text-sm font-medium shadow-lg hover:shadow-teal-500/20 hover:from-teal-500 hover:to-teal-400 transition-all duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Your Own
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-dark-800 border border-teal-700/30 rounded-xl p-8 shadow-lg">
                <svg className="h-12 w-12 mx-auto text-beige-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-beige-500">{error}</h3>
                <p className="mt-2 text-beige-600">The user or their links could not be found.</p>
                <Link
                  href="/"
                  className="mt-6 inline-block px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg text-sm font-medium shadow-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-200"
                >
                  Go Home
                </Link>
              </div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* User header */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden bg-gradient-to-br from-dark-800 via-dark-700 to-dark-800 border border-teal-700/30 rounded-2xl p-8 shadow-xl"
              >
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-dark-800/70 rounded-2xl"></div>

                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="h-full w-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2348A6A7\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-beige-500 font-bold text-3xl shadow-xl mb-5 sm:mb-0 sm:mr-6 transform rotate-3 ring-4 ring-dark-800">
                    {userData?.username ? userData.username.charAt(0).toUpperCase() : '?'}
                  </div>

                  <div>
                    <div className="flex items-center justify-center sm:justify-start mb-2">
                      <h1 className="text-3xl font-bold text-beige-500">{userData?.username}'s Links</h1>
                      <div className="ml-3 px-2 py-1 bg-teal-500/20 rounded-md text-teal-500 text-xs font-semibold uppercase tracking-wider">
                        Public
                      </div>
                    </div>
                    <p className="text-beige-600 text-lg">A curated collection of shortened links</p>

                    <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-dark-700/50 text-beige-600 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {links.length} {links.length === 1 ? 'link' : 'links'} available
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Links list */}
              {links.length === 0 ? (
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-dark-800 to-dark-700 border border-teal-700/30 rounded-2xl p-10 text-center shadow-xl relative overflow-hidden"
                >
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2348A6A7\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
                  </div>

                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto bg-dark-700/50 rounded-full flex items-center justify-center mb-6">
                      <svg className="h-10 w-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>

                    <h3 className="text-xl font-bold text-beige-500 mb-3">No links available</h3>
                    <p className="text-beige-600 max-w-md mx-auto">This user hasn't created any public links yet. Check back later or create your own collection of links.</p>

                    <Link
                      href="/"
                      className="mt-6 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg text-sm font-medium shadow-lg hover:shadow-teal-500/20 hover:from-teal-500 hover:to-teal-400 transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Your Own
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-dark-800 to-dark-700 border border-teal-700/30 rounded-2xl shadow-xl overflow-hidden relative"
                >
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2348A6A7\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
                  </div>

                  <div className="relative z-10 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-beige-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Available Links
                      </h2>
                      <div className="text-xs font-medium text-beige-600 bg-dark-700/50 px-2 py-1 rounded-md">
                        {links.length} {links.length === 1 ? 'link' : 'links'}
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li
                          key={link._id}
                          id={`link-${link.shortCode}`}
                          className="bg-dark-700/30 rounded-xl p-4 transition-all duration-300 hover:bg-dark-600/30 hover:shadow-md group relative overflow-hidden"
                        >
                          {/* Hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/0 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                  </div>
                                  <h3 className="text-lg font-medium text-beige-500 truncate">{link.title}</h3>
                                </div>

                                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pl-11">
                                  <a
                                    href={`${baseUrl}${link.shortCode}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-teal-500 hover:text-teal-400 transition-colors truncate flex items-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    {`${baseUrl}${link.shortCode}`}
                                  </a>
                                  <span className="hidden sm:inline text-beige-600">•</span>
                                  <a
                                    href={link.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-beige-600 hover:text-beige-500 transition-colors truncate flex items-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    {link.link}
                                  </a>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 pl-11 sm:pl-0">
                                <motion.button
                                  onClick={() => handleCopyShortUrl(link.shortCode)}
                                  className="p-2 bg-dark-700/50 text-beige-500 rounded-lg hover:bg-dark-600/50 transition-colors"
                                  aria-label="Copy link"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </motion.button>

                                <motion.a
                                  href={link.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-200 shadow-md hover:shadow-teal-500/20"
                                  aria-label="Visit original link"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </motion.a>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Powered by section */}
              <motion.div
                variants={itemVariants}
                className="text-center mt-12 relative"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -z-10"></div>
                <div className="bg-dark-800/30 backdrop-blur-sm border border-teal-700/20 rounded-full py-3 px-6 inline-flex items-center shadow-lg">
                  <span className="text-beige-600 text-sm mr-2">Powered by</span>
                  <Link href="/" className="flex items-center group">
                    <Logo className="text-teal-500" size="small" linkToHome={false} />
                    <span className="ml-1 text-beige-500 font-medium group-hover:text-teal-500 transition-colors">TinyHost</span>
                  </Link>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <Link
                    href="/"
                    className="text-beige-600 hover:text-teal-500 transition-colors text-sm"
                  >
                    Create Your Own
                  </Link>
                  <span className="text-beige-700">•</span>
                  <Link
                    href="/"
                    className="text-beige-600 hover:text-teal-500 transition-colors text-sm"
                  >
                    About
                  </Link>
                  <span className="text-beige-700">•</span>
                  <Link
                    href="/"
                    className="text-beige-600 hover:text-teal-500 transition-colors text-sm"
                  >
                    Privacy
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
}
