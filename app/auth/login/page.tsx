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
} from "lucide-react";
import Navbar from "../../navbar";
import { signIn, fetchAuthSession } from "aws-amplify/auth";

export default function Login() {
  const router = useRouter();

  const [userType, setUserType] = useState<"student" | "faculty" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType) {
      alert("Please select account type first.");
      return;
    }

    setIsLoading(true);

    try {
      await signIn({
        username: email,
        password: password,
      });

      const session = await fetchAuthSession();
      const role = session.tokens?.idToken?.payload["custom:role"];

      // 🚫 Worker should not login from here
      if (role === "worker") {
        alert("Workers must login from worker portal.");
        router.push("/auth/staff");
        return;
      }

      // 🚫 Wrong selection
      if (role !== userType) {
        alert("You selected the wrong account type.");
        return;
      }

      // ✅ Success → Redirect to Home
      router.push("/");

    } catch (error: any) {
      console.error("Login error:", error);

      if (error.name === "UserNotConfirmedException") {
        alert("Please verify your email first.");
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
      } else if (error.name === "NotAuthorizedException") {
        alert("Incorrect email or password.");
      } else {
        alert(error.message || "Login failed");
      }
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
                className="text-5xl font-black text-slate-900 mb-4 tracking-tight"
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 dark:text-slate-400"
              >
                Select your account type to continue
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              {/* Student Card */}
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
                    Student Login
                    <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Access your hostel dashboard and track complaints
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400 dark:bg-emerald-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>

              {/* Faculty Card */}
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
                    Faculty Login
                    <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-teal-500 dark:group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Manage hostel operations and review requests
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-400 dark:bg-teal-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>

            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <button
              onClick={() => setUserType(null)}
              className="mb-8 font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>

            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100/60 dark:border-slate-800 p-8 sm:p-12 transition-colors">

              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                  {userType === "student" ? "Student" : "Faculty"} Login
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder={userType === "student" ? "student@bennett.edu.in" : "faculty@bennett.edu.in"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-4 rounded-full border border-slate-200 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Link href="/auth/forgot-password">
                    <span className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold cursor-pointer transition-colors">
                      Forgot password?
                    </span>
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${userType === "student"
                    ? "bg-emerald-300 dark:bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-400 shadow-emerald-200 dark:shadow-emerald-900/40"
                    : "bg-teal-300 dark:bg-teal-500 hover:bg-teal-400 dark:hover:bg-teal-400 shadow-teal-200 dark:shadow-teal-900/40"
                    } text-emerald-950 dark:text-emerald-50 py-4 rounded-full font-bold text-lg transition shadow-xl hover:-translate-y-1`}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>

              </form>

              <div className="text-center mt-6">
                <Link href="/auth/signup">
                  <span className="text-emerald-700 font-bold hover:underline cursor-pointer">
                    Create an Account
                  </span>
                </Link>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
