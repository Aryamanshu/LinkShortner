import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { URI } from "@/source";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${URI}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        const errorMessage = result.message || result.error || "Failed to create account";
        console.error("API error details:", result);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error(`Error: ${error.message || "An unknown error occurred"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const pageVariants = {
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

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }),
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(242, 239, 231, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  return (
    <Layout title="Sign Up - TinyHost" showHeader={false} showFooter={false}>
      <motion.div
        className="min-h-screen flex flex-col md:flex-row"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {/* Left side - Gradient */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden">
          {/* Background patterns */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700/80 via-teal-800/80 to-dark-800/50 backdrop-blur-sm"></div>

          <div className="relative h-full flex flex-col justify-center items-center text-beige-500 p-12">
            <motion.div
              className="max-w-md text-center"
              variants={itemVariants}
            >
              <motion.div
                className="mb-8 inline-block p-4 bg-beige-500/10 rounded-2xl backdrop-blur-sm border border-beige-500/10 shadow-xl"
                initial={{ rotate: 5, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
              >
                <svg className="w-16 h-16 text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </motion.div>

              <motion.h2
                className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-beige-400 to-beige-500"
                variants={itemVariants}
              >
                Join TinyHost today
              </motion.h2>

              <motion.p
                className="text-lg mb-8 text-beige-500"
                variants={itemVariants}
              >
                Create an account to start shortening your links, generating QR codes, and tracking your link performance.
              </motion.p>

              <motion.div
                className="bg-beige-500/5 border border-beige-500/10 backdrop-blur-sm rounded-xl p-6 shadow-xl relative overflow-hidden"
                variants={itemVariants}
              >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-600/10 rounded-full -ml-16 -mb-16 blur-xl"></div>

                <h3 className="text-xl font-semibold mb-5 text-beige-500 relative z-10">Why choose TinyHost?</h3>

                <ul className="space-y-5 text-left relative z-10">
                  <motion.li
                    className="flex items-start p-3 rounded-lg hover:bg-beige-500/5 transition-colors duration-200"
                    variants={featureVariants}
                    custom={0}
                    whileHover="hover"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-4 shadow-md">
                      <svg className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-beige-500 mb-1">Lightning Fast</h4>
                      <p className="text-sm text-beige-600">Create short, memorable links in seconds</p>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start p-3 rounded-lg hover:bg-beige-500/5 transition-colors duration-200"
                    variants={featureVariants}
                    custom={1}
                    whileHover="hover"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-600/20 flex items-center justify-center mr-4 shadow-md">
                      <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-beige-500 mb-1">QR Code Generation</h4>
                      <p className="text-sm text-beige-600">Generate QR codes for easy mobile sharing</p>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start p-3 rounded-lg hover:bg-beige-500/5 transition-colors duration-200"
                    variants={featureVariants}
                    custom={2}
                    whileHover="hover"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-700/20 flex items-center justify-center mr-4 shadow-md">
                      <svg className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-beige-500 mb-1">Advanced Analytics</h4>
                      <p className="text-sm text-beige-600">Track clicks and analyze link performance</p>
                    </div>
                  </motion.li>
                </ul>

                <motion.div
                  className="mt-6 pt-5 border-t border-beige-500/10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-sm text-beige-600">Join thousands of satisfied users today</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex items-center justify-center bg-gradient-to-br from-dark-900 to-dark-800 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

          <motion.div
            className="w-full max-w-md space-y-8 relative z-10"
            variants={itemVariants}
          >
            <div className="text-center mb-10">
              <motion.div variants={logoVariants}>
                <Logo size="large" className="mb-6 inline-block text-teal-500" />
              </motion.div>
              <motion.h1
                className="text-3xl font-bold text-beige-500 mb-2"
                variants={itemVariants}
              >
                Create an account
              </motion.h1>
              <motion.p
                className="text-beige-600"
                variants={itemVariants}
              >
                Join us today and start exploring
              </motion.p>
            </div>

            <motion.form
              onSubmit={handleSignup}
              className="space-y-6"
              variants={itemVariants}
            >
              <Input
                label="Username"
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />

              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
              />

              <motion.div
                className="pt-4"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  }
                >
                  Create Account
                </Button>
              </motion.div>

              <motion.div
                className="relative my-6"
                variants={itemVariants}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-teal-700/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-dark-800 px-3 text-beige-600">By signing up, you agree to our</span>
                </div>
              </motion.div>

              <motion.div
                className="flex justify-center space-x-4 text-sm"
                variants={itemVariants}
              >
                <a href="#" className="text-teal-500 hover:text-teal-400 transition-colors">Terms of Service</a>
                <span className="text-beige-700">•</span>
                <a href="#" className="text-teal-500 hover:text-teal-400 transition-colors">Privacy Policy</a>
              </motion.div>
            </motion.form>

            <motion.p
              className="mt-10 text-center text-sm text-beige-600"
              variants={itemVariants}
            >
              Already have an account?{' '}
              <Link href="/" className="font-medium text-teal-500 hover:text-teal-400 transition-colors">
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}
