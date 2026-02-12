"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { confirmSignUp } from "aws-amplify/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Key, ArrowRight, CheckCircle, Shield } from "lucide-react";
import Navbar from "../../navbar";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      alert("Account verified successfully!");
      router.push("/");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-3xl mb-6"
          >
            <Shield className="w-10 h-10 text-indigo-600" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-3"
          >
            Verify Your Account
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg"
          >
            Enter the verification code sent to your email
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8"
        >
          
          <div className="space-y-5">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none transition text-slate-900 text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Verification Code Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Verification Code
              </label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none transition text-slate-900 text-lg font-mono tracking-wider"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Check your inbox</p>
                <p className="text-blue-700">
                  We've sent a 6-digit verification code to your email. It may take a few minutes to arrive.
                </p>
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify Account"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <button className="text-sm text-slate-600 hover:text-indigo-600 font-medium transition">
              Didn't receive code? Resend
            </button>
          </div>

        </motion.div>

        {/* Help Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-slate-500 mt-6"
        >
          Need help? Contact support at{" "}
          <span className="font-semibold text-slate-900">support@hosteldesk.com</span>
        </motion.p>

      </div>
    </div>
  );
}