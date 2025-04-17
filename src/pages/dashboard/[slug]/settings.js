import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { URI } from "@/source";
import { motion } from "framer-motion";

// Custom components
import DashboardLayout from "@/components/DashboardLayout";

export default function SettingsPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const sectionVariants = {
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

  // Fetch user data
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // First, get user data
      const userResponse = await fetch(`${URI}/api/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID: slug }),
      });

      const userResult = await userResponse.json();
      console.log('User result:', userResult);

      // Then, get links data
      const response = await fetch(`${URI}/api/getlinks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID: slug }),
      });

      const result = await response.json();

      if (userResponse.ok && response.ok) {
        // Get user data from the user API response
        const user = userResult.data || {};
        const links = result.data || {};

        console.log('User data from API:', user);
        console.log('Links data from API:', links);

        // Set user data with actual values from API
        setUserData({
          id: slug,
          _id: slug,
          username: user.username || `user_${slug.substring(0, 6)}`,
          email: user.email || "",
          createdAt: user.createdAt || new Date().toISOString()
        });

        // Set form fields
        setUsername(user.username || `user_${slug.substring(0, 6)}`);
        setEmail(user.email || "");
      } else {
        toast.error(userResult.error || result.error || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("An error occurred while fetching your data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchUserData();
    }
  }, [slug]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      // This is a placeholder - in a real app, you would implement the API endpoint
      toast.success("Profile updated successfully");

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local state
      setUserData(prev => ({
        ...prev,
        username,
        email
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    setIsSaving(true);

    try {
      // This is a placeholder - in a real app, you would implement the API endpoint
      toast.success("Password changed successfully");

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing your password");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      // This is a placeholder - in a real app, you would implement the API endpoint
      toast.success("Account deleted successfully");

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("An error occurred while deleting your account");
    }
  };

  return (
    <DashboardLayout title="Settings | TinyHost" user={userData} activePage="Settings">
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
          variants={sectionVariants}
        >
          <h2 className="text-2xl font-bold text-beige-500">Account Settings</h2>
          <p className="text-beige-600 text-sm mt-1">Manage your account preferences and security settings</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Settings */}
            <motion.div
              className="lg:col-span-2 bg-dark-800 border border-teal-700/30 rounded-xl p-6 shadow-lg"
              variants={sectionVariants}
            >
              <h3 className="text-xl font-semibold text-beige-500 mb-4">Profile Information</h3>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-beige-600 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-teal-700/20 rounded-lg bg-dark-700/50 text-beige-500 placeholder-beige-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Your username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-beige-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-teal-700/20 rounded-lg bg-dark-700/50 text-beige-500 placeholder-beige-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Your email address"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg text-sm font-medium shadow-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Account Summary */}
            <motion.div
              className="bg-dark-800 border border-teal-700/30 rounded-xl p-6 shadow-lg"
              variants={sectionVariants}
            >
              <h3 className="text-xl font-semibold text-beige-500 mb-4">Account Summary</h3>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-dark-700/50 rounded-lg border border-teal-700/20">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-beige-500 font-semibold shadow-md mr-4">
                    {userData?.username ? userData.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="text-beige-500 font-medium">{userData?.username || 'User'}</div>
                    <div className="text-beige-600 text-xs flex items-center">
                      <span className="inline-block h-2 w-2 rounded-full bg-teal-500 mr-1"></span>
                      Pro Account
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-dark-700/50 rounded-lg border border-teal-700/20">
                  <div className="text-sm text-beige-600 mb-1">Account Created</div>
                  <div className="text-beige-500">
                    {userData?.createdAt
                      ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Unknown'}
                  </div>
                </div>

                <div className="p-4 bg-dark-700/50 rounded-lg border border-teal-700/20">
                  <div className="text-sm text-beige-600 mb-1">Subscription</div>
                  <div className="flex justify-between items-center">
                    <div className="text-beige-500">Free Plan</div>
                    <button
                      className="px-3 py-1 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg text-xs font-medium shadow-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-200"
                      onClick={() => toast.success("Upgrade feature will be implemented in a future update")}
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              className="lg:col-span-2 bg-dark-800 border border-teal-700/30 rounded-xl p-6 shadow-lg"
              variants={sectionVariants}
            >
              <h3 className="text-xl font-semibold text-beige-500 mb-4">Security</h3>

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-beige-600 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-teal-700/20 rounded-lg bg-dark-700/50 text-beige-500 placeholder-beige-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your current password"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-beige-600 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-teal-700/20 rounded-lg bg-dark-700/50 text-beige-500 placeholder-beige-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter new password"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-beige-600 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-teal-700/20 rounded-lg bg-dark-700/50 text-beige-500 placeholder-beige-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-beige-500 rounded-lg text-sm font-medium shadow-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Changing Password...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              className="lg:col-span-3 bg-dark-800 border border-red-700/30 rounded-xl p-6 shadow-lg"
              variants={sectionVariants}
            >
              <h3 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h3>

              <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4">
                <h4 className="text-lg font-medium text-beige-500 mb-2">Delete Account</h4>
                <p className="text-beige-600 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-beige-500 rounded-lg text-sm font-medium shadow-lg hover:from-red-500 hover:to-red-400 transition-all duration-200"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
