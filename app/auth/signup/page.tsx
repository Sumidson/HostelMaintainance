"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Users,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Phone,
  Key,
  Shield,
  CheckCircle,
} from "lucide-react";
import Navbar from "../../navbar";
import { signUp, confirmSignUp, signIn } from "aws-amplify/auth";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "faculty" | null>(null);

  // Verification state
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    department: "",
    block: "",
    roomNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const blocks = [
    "N Block", "P Block", "K Block",
    "C1 Block", "C2 Block", "C3 Block", "C4 Block", "C5 Block",
    "C6 Block", "C7 Block", "C8 Block", "C9 Block", "C10 Block", "C11 Block",
    "D1 Block", "D2 Block", "D3 Block", "D4 Block", "D5 Block", "D6 Block", "D7 Block",
    "A Block", "B Block"
  ];

  const departments = [
    "Computer Science", "Electronics", "Mechanical", "Civil",
    "Management", "Biotechnology", "Administration", "Other"
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType) {
      toast.error("Please select account type first.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            phone_number: `+91${formData.phone.replace(/\D/g, "")}`,
            "custom:role": userType,
          },
        },
      });

      toast.success("Signup successful! Please verify your email.");
      setVerificationStep(true);

    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Confirm Sign Up
      await confirmSignUp({
        username: formData.email,
        confirmationCode: verificationCode,
      });

      // 2. Auto Sign In
      await signIn({
        username: formData.email,
        password: formData.password,
      });

      toast.success("Account verified & logged in!");
      router.push("/");

    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(error.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 dark:from-slate-950 to-slate-100 dark:to-slate-900 transition-colors">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">

        {!userType ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
              >
                Create Your Account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 dark:text-slate-400"
              >
                Select your account type to get started
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => setUserType("student")}
                className="group relative bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-[#BAF1D4]/40 dark:hover:shadow-emerald-900/20 p-12 text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 dark:from-emerald-900/20 to-teal-50 dark:to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 group-hover:bg-emerald-400 dark:group-hover:bg-emerald-500/40 rounded-full flex items-center justify-center mb-6 transition-colors">
                    <GraduationCap className="w-10 h-10 text-emerald-700 dark:text-emerald-400 group-hover:text-white dark:group-hover:text-emerald-100 transition-colors" />
                  </div>

                  <h3 className="font-black text-3xl text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                    Student Signup
                    <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">
                    Create your student account to access hostel services and submit requests
                  </p>

                  <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Sign up as Student</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400 dark:bg-emerald-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setUserType("faculty")}
                className="group relative bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-teal-100/40 dark:hover:shadow-teal-900/20 p-12 text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 dark:from-teal-900/20 to-cyan-50 dark:to-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/40 group-hover:bg-teal-400 dark:group-hover:bg-teal-500/40 rounded-full flex items-center justify-center mb-6 transition-colors">
                    <Users className="w-10 h-10 text-teal-700 dark:text-teal-400 group-hover:text-white dark:group-hover:text-teal-100 transition-colors" />
                  </div>

                  <h3 className="font-black text-3xl text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                    Faculty Signup
                    <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-teal-500 dark:group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">
                    Create your faculty account to manage hostel operations and oversee requests
                  </p>

                  <div className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 font-bold">
                    <span>Sign up as Faculty</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-400 dark:bg-teal-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>

            </div>
          </div>
        ) : !verificationStep ? (
          // SIGNUP FORM
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >

            <button
              onClick={() => setUserType(null)}
              className="mb-8 font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to selection
            </button>

            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100/60 dark:border-slate-800 p-8 sm:p-12 transition-colors">

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${userType === "student" ? "bg-emerald-100 dark:bg-emerald-900/40" : "bg-teal-100 dark:bg-teal-900/40"} rounded-full mb-4`}>
                  {userType === "student" ? (
                    <GraduationCap className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
                  ) : (
                    <Users className="w-8 h-8 text-teal-700 dark:text-teal-400" />
                  )}
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                  {userType === "student" ? "Student" : "Faculty"} Registration
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Fill in your details to create an account
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-5">

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder={userType === "student" ? "student@bennett.edu.in" : "faculty@bennett.edu.in"}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXXXXXXX"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 rounded-full border border-slate-200 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 rounded-full border border-slate-200 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
                    I agree to the{" "}
                    <a href="#" className="text-slate-900 dark:text-white font-semibold hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-slate-900 dark:text-white font-semibold hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${userType === "student" ? "bg-emerald-300 dark:bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-400 shadow-emerald-200 dark:shadow-emerald-900/40" : "bg-teal-300 dark:bg-teal-500 hover:bg-teal-400 dark:hover:bg-teal-400 shadow-teal-200 dark:shadow-teal-900/40"} text-emerald-950 dark:text-emerald-50 py-4 rounded-full font-bold text-lg transition shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">Already have an account?</span>
                </div>
              </div>

              <Link href="/auth/login">
                <button className="w-full py-4 rounded-full font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  Sign In
                </button>
              </Link>
            </div>
          </motion.div>
        ) : (
          // VERIFICATION FORM (Inline)
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900/40 rounded-3xl mb-6 flex-shrink-0">
                <Shield className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                Verify Your Email
              </h2>

              <p className="text-slate-600 dark:text-slate-400">
                We've sent a code to <span className="font-semibold text-slate-900 dark:text-white">{formData.email}</span>
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100/60 dark:border-slate-800 p-8 sm:p-12 transition-colors">
              <form onSubmit={handleVerify} className="space-y-6">

                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Verification Code
                  </label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 dark:text-white text-lg font-mono tracking-wider"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex items-start gap-3 transition-colors">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900 dark:text-blue-200">
                    <p className="font-semibold mb-1">Check your inbox</p>
                    <p className="text-blue-700 dark:text-blue-300/80">
                      It may take a few minutes for the code to arrive.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-300 dark:bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-400 text-emerald-950 dark:text-emerald-50 py-4 rounded-full font-bold text-lg transition shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Verify & Login"}
                  <ArrowRight className="w-5 h-5" />
                </button>

              </form>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}