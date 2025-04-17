import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { URI } from "@/source";
import { motion } from "framer-motion";

// Custom components
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStats from "@/components/DashboardStats";

export default function AnalyticsPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [userData, setUserData] = useState(null);
  const [linkData, setLinkData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch user data and links
  const fetchUserData = async () => {
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
  };

  useEffect(() => {
    if (slug) {
      fetchUserData();
    }
  }, [slug]);

  // Calculate statistics for the dashboard
  const calculateStats = () => {
    const totalLinks = linkData.length;
    const totalClicks = linkData.reduce((sum, link) => sum + (link.clicks || 0), 0);
    const activeLinks = linkData.filter(link => link.status === 'active').length;

    return {
      totalLinks,
      totalClicks,
      activeLinks,
      averageClicksPerLink: totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0
    };
  };

  return (
    <DashboardLayout title="Analytics | TinyHost" user={userData} activePage="Analytics">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="space-y-8"
      >
        {/* Dashboard Stats */}
        <DashboardStats stats={calculateStats()} />

        {/* Analytics Content */}
        <motion.div
          className="bg-gradient-to-br from-dark-800 to-dark-700 border border-teal-700/30 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-beige-500 mb-4">Link Analytics</h2>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : linkData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-beige-600">No links to analyze yet. Create some links to see analytics.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark-700/50 rounded-xl p-5 border border-teal-700/20">
                  <h3 className="text-lg font-semibold text-beige-500 mb-3">Top Performing Links</h3>
                  <div className="space-y-3">
                    {[...linkData]
                      .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
                      .slice(0, 5)
                      .map((link, index) => (
                        <div key={link._id} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-teal-500 font-medium mr-2">#{index + 1}</span>
                            <span className="text-beige-500 truncate max-w-[150px]">{link.title}</span>
                          </div>
                          <span className="text-beige-600 font-semibold">{link.clicks || 0} clicks</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-dark-700/50 rounded-xl p-5 border border-teal-700/20">
                  <h3 className="text-lg font-semibold text-beige-500 mb-3">Recent Links</h3>
                  <div className="space-y-3">
                    {[...linkData]
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .slice(0, 5)
                      .map((link) => (
                        <div key={link._id} className="flex justify-between items-center">
                          <span className="text-beige-500 truncate max-w-[200px]">{link.title}</span>
                          <span className="text-beige-600 text-sm">
                            {new Date(link.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="bg-dark-700/50 rounded-xl p-5 border border-teal-700/20">
                <h3 className="text-lg font-semibold text-beige-500 mb-4">All Links Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-teal-700/20">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-beige-600 uppercase tracking-wider">Link</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-beige-600 uppercase tracking-wider">Created</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-beige-600 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-beige-600 uppercase tracking-wider">Clicks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-teal-700/10">
                      {linkData.map((link) => (
                        <tr key={link._id} className="hover:bg-dark-600/50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-beige-500">{link.title}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-beige-600">
                              {new Date(link.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                link.status === 'active'
                                  ? 'bg-teal-700/20 text-teal-500'
                                  : 'bg-red-700/20 text-red-500'
                              }`}
                            >
                              {link.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-semibold text-teal-500">
                              {link.clicks || 0}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
