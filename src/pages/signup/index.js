import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { URI } from "@/source";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

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

  return (
    <Layout title="Sign Up - TinyHost" showHeader={false} showFooter={false}>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left side - Gradient */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700/80 via-teal-800/80 to-dark-800/50 backdrop-blur-sm"></div>
          <div className="relative h-full flex flex-col justify-center items-center text-beige-500 p-12">
            <div className="max-w-md text-center">
              <div className="mb-8 inline-block p-2 bg-beige-500/10 rounded-2xl">
                <svg className="w-12 h-12 text-beige-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-beige-400 to-beige-500">Join TinyHost today</h2>
              <p className="text-lg mb-8 text-beige-500">Create an account to start shortening your links, generating QR codes, and tracking your link performance.</p>
              <div className="space-y-6">
                <div className="bg-beige-500/5 border border-beige-500/10 backdrop-blur-sm rounded-xl p-6 transform transition-transform hover:bg-beige-500/10">
                  <h3 className="text-xl font-semibold mb-4 text-beige-500">Why choose TinyHost?</h3>
                  <ul className="space-y-4 text-left">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-beige-500">Create short, memorable links in seconds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-600/20 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-beige-500">Generate QR codes for easy mobile sharing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-700/20 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-beige-500">Track clicks and analyze link performance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex items-center justify-center bg-dark-800">
          <div className="w-full max-w-md space-y-8 animate-fade-in">
            <div className="text-center mb-10">
              <Logo size="large" className="mb-6 inline-block text-teal-500" />
              <h1 className="text-3xl font-bold text-beige-500">Create an account</h1>
              <p className="mt-2 text-beige-600">Join us today and start exploring</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <Input
                label="Username"
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
