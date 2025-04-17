import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import { URI } from "@/source";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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

  return (
    <Layout title="Sign In - TinyHost" showHeader={false} showFooter={false}>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex items-center justify-center bg-dark-800">
          <div className="w-full max-w-md space-y-8 animate-fade-in">
            <div className="text-center mb-10">
              <Logo size="large" className="mb-6 inline-block text-teal-500" />
              <h1 className="text-3xl font-bold text-beige-500">Welcome back</h1>
              <p className="mt-2 text-beige-600">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              <Input
                label="Username"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Sign In
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={() => setIsGitHubLoading(true)}
                  disabled={isGitHubLoading}
                >
                  {isGitHubLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                  )}
                  GitHub
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={() => setGoogleLoading(true)}
                  disabled={googleLoading}
                >
                  {googleLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                  )}
                  Google
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Image/Gradient */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-800/80 via-teal-700/80 to-teal-600/80 backdrop-blur-sm"></div>
          <div className="relative h-full flex flex-col justify-center items-center text-beige-500 p-12">
            <div className="max-w-md text-center">
              <div className="mb-8 inline-block p-2 bg-beige-500/10 rounded-2xl">
                <svg className="w-12 h-12 text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-beige-400 to-beige-500">Simplify your links</h2>
              <p className="text-lg mb-8 text-beige-500">Create short, memorable links that redirect to your long URLs. Track clicks and manage all your links in one place.</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-beige-500/5 border border-beige-500/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105 hover:bg-beige-500/10">
                  <span className="text-2xl font-bold text-teal-500">Fast</span>
                  <span className="text-sm mt-1 text-beige-500">Creation</span>
                </div>
                <div className="bg-beige-500/5 border border-beige-500/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105 hover:bg-beige-500/10">
                  <span className="text-2xl font-bold text-teal-600">Easy</span>
                  <span className="text-sm mt-1 text-beige-500">Sharing</span>
                </div>
                <div className="bg-beige-500/5 border border-beige-500/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105 hover:bg-beige-500/10">
                  <span className="text-2xl font-bold text-teal-700">Smart</span>
                  <span className="text-sm mt-1 text-beige-500">Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
