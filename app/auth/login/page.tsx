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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">

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

              {/* Student Card */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => setUserType("student")}
                className="group relative bg-white rounded-3xl border-2 border-slate-200 hover:border-indigo-500 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl p-12 text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-20 h-20 bg-indigo-100 group-hover:bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <GraduationCap className="w-10 h-10 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center justify-between">
                    Student Login
                    <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-600">
                    Access your hostel dashboard and track complaints
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>

              {/* Faculty Card */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setUserType("faculty")}
                className="group relative bg-white rounded-3xl border-2 border-slate-200 hover:border-amber-500 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl p-12 text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-20 h-20 bg-amber-100 group-hover:bg-amber-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <Users className="w-10 h-10 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center justify-between">
                    Faculty Login
                    <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-600">
                    Manage hostel operations and review requests
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
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
              className="mb-8 text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
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
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
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

                <div className="flex justify-end">
                  <Link href="/auth/forgot-password">
                    <span className="text-sm text-slate-600 hover:text-indigo-600 font-medium cursor-pointer">
                      Forgot password?
                    </span>
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${
                    userType === "student"
                      ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                      : "bg-amber-500 hover:bg-amber-600 shadow-amber-200"
                  } text-white py-4 rounded-xl font-semibold text-lg transition shadow-lg`}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>

              </form>

              <div className="text-center mt-6">
                <Link href="/auth/signup">
                  <span className="text-slate-600 hover:underline cursor-pointer">
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
