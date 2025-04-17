import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { URI } from "@/source";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

// Custom components
import DashboardLayout from "@/components/DashboardLayout";

export default function QRCodesPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [userData, setUserData] = useState(null);
  const [linkData, setLinkData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Fetch user data and links
  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URI}/api/getlinks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID: slug }),
      });

      const result = await response.json();

      if (response.ok) {
        setLinkData(result?.data.links || []);
        setUserData({
          username: "User" // You can add more user data here if available
        });
      } else {
        toast.error(result.error || "Failed to fetch links");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("An error occurred while fetching your links");
    } finally {
      setIsLoading(false);
    }
  }, [slug, setLinkData, setUserData, setIsLoading]);

  useEffect(() => {
    if (slug) {
      fetchUserData();
    }
  }, [slug, fetchUserData]);

  // Handle downloading QR code
  const handleDownloadQR = (shortCode, title) => {
    const canvas = document.getElementById(`qr-${shortCode}`);
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("QR code downloaded successfully");
  };

  // Handle copying short URL to clipboard
  const handleCopyShortUrl = (shortCode) => {
    const shortUrl = `${baseUrl}${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied to clipboard");
  };

  return (
    <DashboardLayout title="QR Codes | TinyHost" user={userData} activePage="QR Codes">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div
          className="bg-gradient-to-r from-dark-800 to-dark-700 border border-teal-700/30 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-beige-500">QR Codes</h2>
          <p className="text-beige-600 text-sm mt-1">Generate and download QR codes for all your shortened links</p>
        </motion.div>

        {/* QR Codes Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : linkData.length === 0 ? (
          <motion.div
            className="bg-dark-800 border border-teal-700/30 rounded-xl p-8 text-center shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <svg className="h-12 w-12 mx-auto text-beige-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm12 0h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1ZM5 20h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-beige-500">No links yet</h3>
            <p className="mt-2 text-beige-600">Create your first shortened link to generate QR codes.</p>
            <button
              onClick={() => router.push(`/dashboard/${slug}/links`)}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg text-sm font-medium shadow-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-200"
            >
              Create Link
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {linkData.map((link) => (
              <motion.div
                key={link._id}
                className="bg-gradient-to-br from-dark-800 to-dark-700 border border-teal-700/30 rounded-xl p-6 shadow-lg flex flex-col items-center"
                variants={cardVariants}
              >
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-semibold text-beige-500 mb-1">{link.title}</h3>
                  <a
                    href={`${baseUrl}${link.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-500 hover:text-teal-400 transition-colors"
                  >
                    {`${baseUrl}${link.shortCode}`}
                  </a>
                </div>

                <div className="bg-white p-4 rounded-lg mb-4">
                  <QRCodeCanvas
                    id={`qr-${link.shortCode}`}
                    value={`${baseUrl}${link.shortCode}`}
                    size={150}
                    level="H"
                    marginSize={4}
                  />
                </div>

                <div className="flex space-x-3 w-full">
                  <button
                    onClick={() => handleCopyShortUrl(link.shortCode)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-dark-700/50 text-beige-500 rounded-lg text-sm font-medium hover:bg-dark-600/50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy URL
                  </button>

                  <button
                    onClick={() => handleDownloadQR(link.shortCode, link.title)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg text-sm font-medium hover:from-teal-500 hover:to-teal-400 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
