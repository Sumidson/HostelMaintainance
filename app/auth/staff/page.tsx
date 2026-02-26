"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  UserCheck,
} from "lucide-react";
import Navbar from "../../navbar";
import Loading from "../../loading";
import { useRouter } from "next/navigation";

export default function StaffLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate small delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (
      email === "staff@bennett.edu.in" &&
      password === "admin"
    ) {
      // Save simple session flag
      localStorage.setItem("staffLoggedIn", "true");
      router.push("/worker-dashboard");
    } else {
      alert("Invalid staff credentials.");
    }

    setIsLoading(false);
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 dark:bg-amber-600 rounded-3xl mb-6 shadow-2xl shadow-amber-500/50 dark:shadow-amber-900/40">
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
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 transition-colors"
          >

            {/* Staff Badge */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-900/30 rounded-2xl p-4 mb-6 flex items-center gap-3 transition-colors">
              <UserCheck className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              <div>
                <div className="text-sm font-bold text-amber-900 dark:text-amber-400">
                  Authorized Personnel Only
                </div>
                <div className="text-xs text-amber-700 dark:text-amber-500/80">
                  Demo Mode Login
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Staff Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@bennett.edu.in"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:border-amber-500 dark:focus:border-amber-500 focus:outline-none transition text-slate-900 dark:text-slate-100 text-lg"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:border-amber-500 dark:focus:border-amber-500 focus:outline-none transition text-slate-900 dark:text-slate-100 text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 dark:from-amber-600 to-orange-500 dark:to-orange-600 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-amber-500/50 dark:shadow-amber-900/40 hover:shadow-xl hover:shadow-amber-500/60 dark:hover:shadow-amber-900/60 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Access Dashboard"}
                <ArrowRight className="w-5 h-5" />
              </button>

            </form>

            <Link href="/">
              <button className="w-full mt-4 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                ← Back to Home
              </button>
            </Link>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
