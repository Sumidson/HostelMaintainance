"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff, UserCheck } from "lucide-react";
import Navbar from "../../navbar";
import Loading from "../../loading";

export default function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API authentication
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log({
      email,
      password
    });
    
    setIsLoading(false);
    
    // Redirect to staff dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {isLoading && <Loading />}
      
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-3xl mb-6 shadow-2xl shadow-amber-500/50">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Staff Portal
            </h1>
            <p className="text-slate-300 text-lg">
              Sign in to access the management dashboard
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            
            {/* Staff Badge */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-amber-600" />
              <div>
                <div className="text-sm font-bold text-amber-900">Authorized Personnel Only</div>
                <div className="text-xs text-amber-700">Staff & Admin Access</div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Staff Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@bennett.edu.in"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none transition text-slate-900 text-lg"
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
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none transition text-slate-900 text-lg"
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
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500" />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-amber-600 font-semibold hover:text-amber-700 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-amber-500/50 hover:shadow-xl hover:shadow-amber-500/60 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Access Dashboard"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Security Notice</span>
              </div>
            </div>

            {/* Security Info */}
            <div className="text-center text-sm text-slate-600 bg-slate-50 rounded-xl p-4">
              <p className="font-semibold mb-1">🔒 Secure Connection</p>
              <p className="text-xs">All login attempts are logged and monitored for security purposes.</p>
            </div>

            {/* Back to Home */}
            <Link href="/">
              <button className="w-full mt-4 py-3 rounded-xl font-semibold text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition">
                ← Back to Home
              </button>
            </Link>
          </motion.div>

          {/* Help Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-slate-400 mt-6"
          >
            Having trouble logging in? Contact IT support at{" "}
            <span className="text-amber-400 font-semibold">support@bennett.edu.in</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
}