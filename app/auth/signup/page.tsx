"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
  Building,
} from "lucide-react";
import Navbar from "../../navbar";
import { signUp } from "aws-amplify/auth";

export default function Signup() {
  const [userType, setUserType] = useState<"student" | "faculty" | null>(null);

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
    "N Block","P Block","K Block",
    "C1 Block","C2 Block","C3 Block","C4 Block","C5 Block",
    "C6 Block","C7 Block","C8 Block","C9 Block","C10 Block","C11 Block",
    "D1 Block","D2 Block","D3 Block","D4 Block","D5 Block","D6 Block","D7 Block",
    "A Block","B Block"
  ];

  const departments = [
    "Computer Science","Electronics","Mechanical","Civil",
    "Management","Biotechnology","Administration","Other"
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType) {
      alert("Please select account type first.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
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

      alert("Account created! Please check your email to verify.");
      setUserType(null);

    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error.message || "Signup failed");
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
                Create Your Account
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600"
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
                className="group relative bg-white rounded-3xl border-2 border-slate-200 hover:border-indigo-500 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl p-12 text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="w-20 h-20 bg-indigo-100 group-hover:bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <GraduationCap className="w-10 h-10 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center justify-between">
                    Student Signup
                    <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Create your student account to access hostel services and submit requests
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-indigo-600 font-semibold">
                    <span>Sign up as Student</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>

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
                    Faculty Signup
                    <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Create your faculty account to manage hostel operations and oversee requests
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
                    <span>Sign up as Faculty</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>

            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >

            <button
              onClick={() => setUserType(null)}
              className="mb-8 text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to selection
            </button>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${userType === "student" ? "bg-indigo-100" : "bg-amber-100"} rounded-2xl mb-4`}>
                  {userType === "student" ? (
                    <GraduationCap className="w-8 h-8 text-indigo-600" />
                  ) : (
                    <Users className="w-8 h-8 text-amber-600" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {userType === "student" ? "Student" : "Faculty"} Registration
                </h2>
                <p className="text-slate-600">
                  Fill in your details to create an account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
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
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
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
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
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

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required 
                    className="w-4 h-4 rounded border-slate-300 mt-1" 
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600">
                    I agree to the{" "}
                    <a href="#" className="text-slate-900 font-semibold hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-slate-900 font-semibold hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${userType === "student" ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" : "bg-amber-500 hover:bg-amber-600 shadow-amber-200"} text-white py-4 rounded-xl font-semibold text-lg transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">Already have an account?</span>
                </div>
              </div>

              <Link href="/login">
                <button className="w-full py-3 rounded-xl font-semibold text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition">
                  Sign In
                </button>
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}