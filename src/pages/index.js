import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import { URI, BASE_URL } from "@/source";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // GitHub OAuth URL
  const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    BASE_URL + '/api/auth/github/callback'
  )}&scope=user:email`;

  // Google OAuth URL
  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    BASE_URL + '/api/auth/google/callback'
  )}&response_type=code&scope=profile email`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${URI}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Successfully signed in!");
        setTimeout(() => {
          router.push(`/dashboard/${result.data._id}`);
        }, 1000);
      } else {
        toast.error(result.error || "Invalid username or password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle GitHub sign in
  const handleGitHubSignIn = () => {
    // Calculate the exact redirect URI that will be sent to GitHub
    const exactRedirectUri = BASE_URL + '/api/auth/github/callback';

    console.log('GitHub OAuth URL:', githubOAuthUrl);
    console.log('GitHub Client ID:', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);
    console.log('Base URL (from env):', process.env.NEXT_PUBLIC_BASE_URL);
    console.log('Base URL (dynamic):', BASE_URL);
    console.log('Exact redirect URI:', exactRedirectUri);

    // Show alert with the redirect URI for easy copying
    alert(`Please add this exact redirect URI to your GitHub OAuth App settings:\n\n${exactRedirectUri}`);

    setIsGitHubLoading(true);
    window.location.href = githubOAuthUrl;
  };

  // Handle Google sign in
  const handleGoogleSignIn = () => {
    console.log('Google OAuth URL:', googleOAuthUrl);
    console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    console.log('Base URL:', process.env.NEXT_PUBLIC_BASE_URL);

    setGoogleLoading(true);
    window.location.href = googleOAuthUrl;
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

  const featureCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      backgroundColor: "rgba(242, 239, 231, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  return (
    <Layout title="Sign In - TinyHost" showHeader={false} showFooter={false}>
      <motion.div
        className="min-h-screen flex flex-col md:flex-row"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {/* Left side - Form */}
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
                Welcome back
              </motion.h1>
              <motion.p
                className="text-beige-600"
                variants={itemVariants}
              >
                Sign in to your account to continue
              </motion.p>
            </div>

            <motion.form
              onSubmit={handleSignIn}
              className="space-y-6"
              variants={itemVariants}
            >
              <Input
                label="Username"
                id="username"
                type="text"
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-teal-700/30 bg-dark-700/50 text-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-beige-600">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-teal-500 hover:text-teal-400 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  }
                >
                  Sign In
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-teal-700/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-dark-800 px-3 text-beige-600">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleGitHubSignIn}
                  disabled={isGitHubLoading}
                  isLoading={isGitHubLoading}
                  icon={!isGitHubLoading && <Icons.gitHub className="h-4 w-4" />}
                >
                  GitHub
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                  isLoading={googleLoading}
                  icon={
                    !googleLoading && (
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      </svg>
                    )
                  }
                >
                  Google
                </Button>
              </div>
            </motion.form>

            <motion.p
              className="mt-10 text-center text-sm text-beige-600"
              variants={itemVariants}
            >
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-teal-500 hover:text-teal-400 transition-colors">
                Sign up now
              </Link>
            </motion.p>
          </motion.div>
        </div>

        {/* Right side - Image/Gradient */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 relative overflow-hidden">
          {/* Background patterns */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-800/80 via-teal-700/80 to-teal-600/80 backdrop-blur-sm"></div>

          <div className="relative h-full flex flex-col justify-center items-center text-beige-500 p-12">
            <motion.div
              className="max-w-md text-center"
              variants={itemVariants}
            >
              <motion.div
                className="mb-8 inline-block p-4 bg-beige-500/10 rounded-2xl backdrop-blur-sm border border-beige-500/10 shadow-xl"
                initial={{ rotate: -5, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
              >
                <svg className="w-16 h-16 text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </motion.div>

              <motion.h2
                className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-beige-400 to-beige-500"
                variants={itemVariants}
              >
                Simplify your links
              </motion.h2>

              <motion.p
                className="text-lg mb-8 text-beige-500"
                variants={itemVariants}
              >
                Create short, memorable links that redirect to your long URLs. Track clicks and manage all your links in one place.
              </motion.p>

              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  className="bg-beige-500/5 border border-beige-500/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center shadow-lg"
                  variants={featureCardVariants}
                  whileHover="hover"
                >
                  <span className="text-2xl font-bold text-teal-500">Fast</span>
                  <span className="text-sm mt-1 text-beige-500">Creation</span>
                </motion.div>

                <motion.div
                  className="bg-beige-500/5 border border-beige-500/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center shadow-lg"
                  variants={featureCardVariants}
                  whileHover="hover"
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-2xl font-bold text-teal-600">Easy</span>
                  <span className="text-sm mt-1 text-beige-500">Sharing</span>
                </motion.div>

                <motion.div
                  className="bg-beige-500/5 border border-beige-500/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center shadow-lg"
                  variants={featureCardVariants}
                  whileHover="hover"
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-2xl font-bold text-teal-700">Smart</span>
                  <span className="text-sm mt-1 text-beige-500">Analytics</span>
                </motion.div>
              </div>

              <motion.div
                className="mt-10 bg-beige-500/5 border border-beige-500/10 backdrop-blur-sm rounded-xl p-5 shadow-lg"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-teal-500/20 flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-beige-500 font-medium">Try it now</span>
                  </div>
                  <div className="text-xs text-beige-600 bg-beige-500/10 px-2 py-1 rounded-full">
                    Free
                  </div>
                </div>
                <p className="text-sm text-beige-600">Sign up today and get access to all premium features for 14 days.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
