"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wrench,
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Sparkles,
  TrendingUp,
  Shield
} from "lucide-react";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* ===== NAVIGATION ===== */}
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: Content */}
          <div className="space-y-5 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">First digital maintenance platform for BU hostels</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight"
            >
              No more calls.<br />
              No more emails.<br />
              <span className="text-slate-400">Just solutions.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg"
            >
              Report room issues, request cleaning, track maintenance—all in one simple dashboard. Built specifically for Bennett University hostel residents and staff.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto bg-slate-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                  Register Complaint
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              </Link>
              <Link href="/status" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-slate-700 border-2 border-slate-200 hover:border-slate-300 transition">
                  Status
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 text-sm"
            >
              <div>
                <div className="font-bold text-xl sm:text-2xl text-slate-900">2,400+</div>
                <div className="text-slate-500">Active Students</div>
              </div>
              <div>
                <div className="font-bold text-xl sm:text-2xl text-slate-900">&lt; 2min</div>
                <div className="text-slate-500">Avg Response</div>
              </div>
              <div>
                <div className="font-bold text-xl sm:text-2xl text-slate-900">94%</div>
                <div className="text-slate-500">Satisfaction</div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Interactive Connection Diagram - hidden on small screens to avoid overflow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative hidden lg:flex items-center justify-center min-h-[400px] xl:min-h-[500px]"
          >
            {/* Main Card with Connection Diagram */}
            <div className="relative w-full max-w-lg h-[380px] xl:h-[450px]">
              
              {/* Symmetric triangle: A apex, B bottom-left, C bottom-center, D bottom-right */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: "visible" }}>
                {/* A (50%, 16%) → B (20%, 68%) */}
                <line x1="50%" y1="16%" x2="20%" y2="68%" stroke="#cbd5e1" strokeWidth="2" />
                {/* A → C (50%, 75%) */}
                <line x1="50%" y1="16%" x2="50%" y2="75%" stroke="#cbd5e1" strokeWidth="2" />
                {/* A → D (80%, 68%) */}
                <line x1="50%" y1="16%" x2="80%" y2="68%" stroke="#cbd5e1" strokeWidth="2" />
                {/* Base: B–C, C–D, D–B */}
                <line x1="20%" y1="68%" x2="50%" y2="75%" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="50%" y1="75%" x2="80%" y2="68%" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="80%" y1="68%" x2="20%" y2="68%" stroke="#cbd5e1" strokeWidth="2" />
              </svg>

              {/* Apex Node A with Fast Resolution card */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute top-[4%] left-1/2 -translate-x-1/2 z-30"
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 xl:w-28 xl:h-28 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-3xl xl:text-4xl">A</span>
                  </div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="bg-white border-2 border-slate-200 rounded-2xl p-4 xl:p-6 shadow-2xl -mt-4 xl:-mt-6 min-w-[160px] xl:min-w-[180px]"
                  >
                    <TrendingUp className="w-6 h-6 xl:w-7 xl:h-7 text-emerald-600 mb-1 xl:mb-2" />
                    <div className="text-2xl xl:text-3xl font-bold text-slate-900">Fast</div>
                    <div className="text-sm xl:text-base text-slate-500">Resolution</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Node B – bottom-left (Track) */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute top-[58%] left-[20%] xl:top-[60%] xl:left-[20%] -translate-x-1/2 z-30"
              >
                <div className="flex flex-col items-center gap-2 xl:gap-3">
                  <div className="w-16 h-16 xl:w-24 xl:h-24 bg-slate-600 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-2xl xl:text-3xl">B</span>
                  </div>
                  <div className="bg-white px-4 py-2 xl:px-6 xl:py-3 rounded-2xl shadow-lg border border-slate-100">
                    <span className="text-sm xl:text-base font-bold text-slate-800">Track</span>
                  </div>
                </div>
              </motion.div>

              {/* Node C – bottom-center (Notify) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute top-[66%] left-1/2 -translate-x-1/2 z-30"
              >
                <div className="flex flex-col items-center gap-2 xl:gap-3">
                  <div className="w-16 h-16 xl:w-24 xl:h-24 bg-slate-600 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-2xl xl:text-3xl">C</span>
                  </div>
                  <div className="bg-white px-4 py-2 xl:px-6 xl:py-3 rounded-2xl shadow-lg border border-slate-100">
                    <span className="text-sm xl:text-base font-bold text-slate-800">Notify</span>
                  </div>
                </div>
              </motion.div>

              {/* Node D – bottom-right (Resolve) */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute top-[58%] left-[80%] xl:top-[60%] xl:left-[82%] -translate-x-1/2 z-30"
              >
                <div className="flex flex-col items-center gap-2 xl:gap-3">
                  <div className="w-16 h-16 xl:w-24 xl:h-24 bg-slate-600 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-2xl xl:text-3xl">D</span>
                  </div>
                  <div className="bg-white px-4 py-2 xl:px-6 xl:py-3 rounded-2xl shadow-lg border border-slate-100">
                    <span className="text-sm xl:text-base font-bold text-slate-800">Resolve</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
              The old way was frustrating
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-1">
              Multiple phone calls, lost emails, unclear status updates. We built a better solution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ProblemCard 
              icon={<Phone className="w-6 h-6" />}
              title="Multiple Calls"
              before="Call reception → Wait → Explain issue → Hope it's logged"
              after="Submit request with photos in 30 seconds"
            />
            <ProblemCard 
              icon={<Mail className="w-6 h-6" />}
              title="Email Black Hole"
              before="Send email → No confirmation → No tracking → Follow up again"
              after="Real-time status updates and notifications"
            />
            <ProblemCard 
              icon={<Clock className="w-6 h-6" />}
              title="Zero Visibility"
              before="No idea when it'll be fixed or who's working on it"
              after="See who's assigned, estimated time, live progress"
            />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Simple, fast, effective
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <StepCard 
              number="1"
              title="Report in Seconds"
              description="Choose issue type, add details, attach photos if needed. Takes less than a minute."
            />
            <StepCard 
              number="2"
              title="Auto-Assignment"
              description="Your request is instantly assigned to the right team member based on priority and availability."
            />
            <StepCard 
              number="3"
              title="Stay Updated"
              description="Get notifications at every step. See real-time status and estimated completion time."
            />
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-slate-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Ready to simplify hostel maintenance?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of Bennett students already using HostelDesk to manage their room issues effortlessly.
          </p>
          <Link href="/register" className="block">
            <button className="w-full sm:w-auto bg-white text-slate-900 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-slate-100 transition shadow-xl">
              Get Started Free
            </button>
          </Link>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 sm:mt-12 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              University verified
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-100 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold">HostelDesk</div>
                <div className="text-xs text-slate-500">Bennett University</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-slate-600">
              <a href="#" className="hover:text-slate-900 transition">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition">Terms</a>
              <a href="#" className="hover:text-slate-900 transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function ProblemCard({ icon, title, before, after }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100">
      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-3">
        <div className="pb-3 border-b border-slate-100">
          <div className="text-xs font-semibold text-red-600 mb-1 uppercase tracking-wide">Before</div>
          <p className="text-sm text-slate-600">{before}</p>
        </div>
        <div>
          <div className="text-xs font-semibold text-emerald-600 mb-1 uppercase tracking-wide">Now</div>
          <p className="text-sm text-slate-900 font-medium">{after}</p>
        </div>
      </div>
    </div>
  );
}

function StepCard({ number, title, description }: any) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}