"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Users, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Navbar from "../../navbar";

export default function Login() {
  const [userType, setUserType] = useState<"student" | "faculty" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log({
      userType,
      email,
      password
    });
    
    setIsLoading(false);
    alert(`${userType === "student" ? "Student" : "Faculty"} login successful!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* User Type Selection */}
        {!userType ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-slate-900 mb-4"
              >
                Welcome Back
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600"
              >
                Select your account type to continue
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Student Login Card */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => setUserType("student")}
                className="group relative bg-white rounded-3xl border-2 border-slate-200 hover:border-indigo-500 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl p-12 text-left"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-indigo-100 group-hover:bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <GraduationCap className="w-10 h-10 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center justify-between">
                    Student Login
                    <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Access your hostel dashboard, submit maintenance requests, and track your complaints
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-indigo-600 font-semibold">
                    <span>Continue as Student</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>

              {/* Faculty Login Card */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setUserType("faculty")}
                className="group relative bg-white rounded-3xl border-2 border-slate-200 hover:border-amber-500 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl p-12 text-left"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-amber-100 group-hover:bg-amber-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <Users className="w-10 h-10 text-amber-600 group-hover:text-white transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center justify-between">
                    Faculty Login
                    <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Manage hostel operations, review requests, and oversee maintenance activities
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
                    <span>Continue as Faculty</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>

            </div>
          </div>
        ) : (
          /* Login Form */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => setUserType(null)}
              className="mb-8 text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to selection
            </button>

            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${userType === "student" ? "bg-indigo-100" : "bg-amber-100"} rounded-2xl mb-4`}>
                  {userType === "student" ? (
                    <GraduationCap className="w-8 h-8 text-indigo-600" />
                  ) : (
                    <Users className="w-8 h-8 text-amber-600" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {userType === "student" ? "Student" : "Faculty"} Login
                </h2>
                <p className="text-slate-600">
                  Enter your credentials to continue
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={userType === "student" ? "student@bennett.edu.in" : "faculty@bennett.edu.in"}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                    <span className="text-slate-600">Remember me</span>
                  </label>
                  <a href="#" className="text-slate-900 font-medium hover:underline">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${userType === "student" ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" : "bg-amber-500 hover:bg-amber-600 shadow-amber-200"} text-white py-4 rounded-xl font-semibold text-lg transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">New to HostelDesk?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Link href="/signup">
                <button className="w-full py-3 rounded-xl font-semibold text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition">
                  Create an Account
                </button>
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}