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
  Shield,
  AlertCircle,
  Bell
} from "lucide-react";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">

      {/* ===== NAVIGATION ===== */}
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT: Content */}
          <div className="space-y-6 sm:space-y-10 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5F7EB] text-[#064E3B] text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">First digital maintenance platform for BU hostels</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Tap a button.<br />
              Get your room fixed.<br />
              <span className="text-[#86D59A]">Maintenance on demand.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[17px] sm:text-[19px] text-[#64748B] dark:text-slate-400 font-medium leading-[1.6] max-w-[480px]"
            >
              Grow your comfort with HostelDesk through smart tracking, secure requests, and expert support. We help you manage hostel issues wisely and achieve long-term peace of mind.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link href="/Register" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto bg-[#BAF1D4] dark:bg-emerald-500 text-[#064E3B] dark:text-emerald-50 px-8 py-4 sm:py-[18px] rounded-full font-bold text-[17px] flex items-center justify-center gap-2 hover:bg-[#A3E5C1] dark:hover:bg-emerald-400 transition shadow-md shadow-[#BAF1D4]/50 dark:shadow-emerald-900/40">
                  Register Complaint
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" strokeWidth={2.5} />
                </button>
              </Link>
              <Link href="/Status" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-10 py-4 sm:py-[18px] rounded-full font-bold text-[17px] text-[#334155] dark:text-slate-200 bg-white dark:bg-slate-900 border-2 border-[#F1F5F9] dark:border-slate-800 shadow-sm hover:border-[#E2E8F0] dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  Track Status
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-10 sm:gap-14 pt-8"
            >
              <div>
                <div className="font-bold text-2xl sm:text-3xl text-[#111827] dark:text-white">2,400+</div>
                <div className="text-slate-500 text-sm font-medium mt-1">Active Students</div>
              </div>
              <div>
                <div className="font-bold text-2xl sm:text-3xl text-[#111827] dark:text-white">&lt; 2min</div>
                <div className="text-slate-500 text-sm font-medium mt-1">Avg Response</div>
              </div>
              <div>
                <div className="font-bold text-2xl sm:text-3xl text-[#111827] dark:text-white">94%</div>
                <div className="text-slate-500 text-sm font-medium mt-1">Satisfaction</div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Mobile Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative flex items-center justify-center min-h-[500px] mt-12 lg:mt-0"
          >
            {/* Phone Frame */}
            <div className="relative w-[300px] h-[600px] sm:w-[320px] sm:h-[640px] bg-slate-900 dark:bg-black rounded-[44px] p-1.5 shadow-2xl shadow-slate-300/50 dark:shadow-emerald-900/20 border-[3px] border-slate-800 dark:border-slate-700 flex flex-col overflow-hidden">

              {/* Top Notch (Dynamic Island) */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50"></div>

              {/* Screen Area */}
              <div className="relative flex-1 bg-white dark:bg-slate-950 rounded-[38px] overflow-hidden flex flex-col">

                {/* Top Green Gradient Section */}
                <div className="h-64 bg-gradient-to-b from-[#E5F7EB] dark:from-emerald-900/40 to-white dark:to-slate-950 relative px-5 pt-12 pb-4">

                  {/* Header Row */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-between items-center mb-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#BAF1D4] dark:bg-emerald-800/80 overflow-hidden drop-shadow-sm border border-white dark:border-emerald-800 flex items-center justify-center">
                        <span className="text-[#064E3B] dark:text-emerald-100 font-black text-lg">S</span>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#059669] dark:text-emerald-400 font-bold uppercase tracking-widest mb-0.5">Welcome</div>
                        <div className="text-sm font-black text-slate-900 dark:text-slate-100 leading-none">Student</div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                      transition={{ delay: 1.5, duration: 0.5, ease: "easeInOut", repeat: 3, repeatDelay: 5 }}
                      className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm dark:shadow-none flex items-center justify-center text-slate-700 dark:text-slate-300"
                    >
                      <Bell className="w-5 h-5" strokeWidth={2} />
                    </motion.div>
                  </motion.div>

                  {/* Glassmorphic Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                    className="w-full h-32 bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-white dark:border-slate-700 shadow-xl shadow-[#BAF1D4]/40 dark:shadow-none p-5 flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5F7EB] dark:bg-emerald-500 rounded-full blur-2xl -mr-10 -mt-10 opacity-50 dark:opacity-20 pointer-events-none"></div>

                    <div className="flex justify-between items-start relative z-10">
                      <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <Wrench className="w-4 h-4 text-[#059669]" />
                        <span className="text-xs font-bold">HostelDesk</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#064E3B] dark:text-emerald-300 bg-[#E5F7EB] dark:bg-emerald-900/50 px-2.5 py-1 rounded-full">Active</span>
                    </div>

                    <div className="relative z-10">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1">Open Requests</div>
                      <div className="text-[28px] font-black text-slate-900 dark:text-white tracking-tight leading-none">2 Pending</div>
                    </div>
                  </motion.div>

                </div>

                {/* Bottom Section (Action Buttons & List) */}
                <div className="flex-1 px-5 pt-4 pb-6 bg-white dark:bg-slate-950 flex flex-col">

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ delay: 0.8 }}
                      className="py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100/50 dark:border-slate-700/50 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Wrench className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Maintenance
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ delay: 0.9 }}
                      className="py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100/50 dark:border-slate-700/50 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Cleaning
                    </motion.div>
                  </div>

                  {/* List Header */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="flex justify-between items-end mb-4"
                  >
                    <div className="text-[13px] font-bold text-slate-900 dark:text-white">Recent Requests</div>
                    <div className="text-[11px] font-bold text-[#059669] dark:text-emerald-400">See all</div>
                  </motion.div>

                  {/* List Items */}
                  <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                    {/* Item 1 */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">AC Repair</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Today, 10:30 AM</div>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-md">Pending</div>
                    </motion.div>

                    {/* Item 2 */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">Room Cleaning</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Yesterday, 4:15 PM</div>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold text-[#059669] dark:text-emerald-400 bg-[#E5F7EB] dark:bg-emerald-900/20 px-2.5 py-1 rounded-md">Done</div>
                    </motion.div>

                    {/* Item 3 */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 }}
                      className="flex items-center justify-between opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E5F7EB] dark:bg-emerald-900/20 flex items-center justify-center text-[#059669] dark:text-emerald-400 border border-[#BAF1D4]/50 dark:border-emerald-900/30">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">Lightbulb</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Mon, 11:00 AM</div>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold text-[#059669] dark:text-emerald-400 bg-[#E5F7EB] dark:bg-emerald-900/20 px-2.5 py-1 rounded-md">Done</div>
                    </motion.div>

                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className="bg-slate-50 dark:bg-slate-950 py-16 sm:py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-6">
              The old way was frustrating
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-base sm:text-lg px-2">
              Multiple phone calls, lost emails, unclear status updates. We built a better solution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            <ProblemCard
              icon={<Phone className="w-6 h-6" />}
              title="Multiple Calls"
              before="Call reception → Wait → Explain issue → Hope it's logged"
              after="Submit request with photos in 30 seconds"
              delay={0.1}
            />
            <ProblemCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Black Hole"
              before="Send email → No confirmation → No tracking → Follow up again"
              after="Real-time status updates and notifications"
              delay={0.2}
            />
            <ProblemCard
              icon={<Clock className="w-6 h-6" />}
              title="Zero Visibility"
              before="No idea when it'll be fixed or who's working on it"
              after="See who's assigned, estimated time, live progress"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
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
      <section className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-50 py-16 sm:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6">
            Ready to simplify hostel maintenance?
          </h2>
          <p className="text-emerald-800 dark:text-emerald-200 text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of Bennett students already using HostelDesk to manage their room issues effortlessly.
          </p>
          <Link href="/Register" className="inline-block relative">
            <button className="w-full sm:w-auto bg-emerald-300 dark:bg-emerald-500 text-emerald-950 dark:text-emerald-50 px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg hover:bg-emerald-400 dark:hover:bg-emerald-400 hover:-translate-y-1 transition transform shadow-xl shadow-emerald-200 dark:shadow-emerald-900/40">
              Get Started Free
            </button>
          </Link>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 sm:mt-12 text-sm text-emerald-700 dark:text-emerald-300 font-medium">
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
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold dark:text-white">HostelDesk</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Bennett University</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition">Support</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm font-medium text-slate-400 dark:text-slate-500">
            Made by sumidson
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function ProblemCard({ icon, title, before, after, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-900 rounded-[32px] p-8 sm:p-10 border border-slate-100/60 dark:border-slate-700/50 shadow-lg shadow-slate-200/40 dark:shadow-none hover:shadow-xl hover:shadow-[#BAF1D4]/40 dark:hover:shadow-emerald-900/20 transition-all duration-300"
    >
      <div className="w-14 h-14 bg-[#E5F7EB] dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-[#059669] dark:text-emerald-400 mb-8 shadow-sm border border-[#BAF1D4]/50 dark:border-emerald-800/50">
        {icon}
      </div>
      <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-8">{title}</h3>
      <div className="space-y-6">
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="inline-flex px-2.5 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-[10px] font-black tracking-widest uppercase mb-3 border border-red-100/50 dark:border-red-900/30">Before</div>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{before}</p>
        </div>
        <div className="pt-2">
          <div className="inline-flex px-2.5 py-1 bg-[#E5F7EB] dark:bg-emerald-900/30 text-[#059669] dark:text-emerald-400 rounded-md text-[10px] font-black tracking-widest uppercase mb-3 border border-[#BAF1D4]/50 dark:border-emerald-800/50">Now</div>
          <p className="text-[15px] text-slate-900 dark:text-white font-bold leading-relaxed">{after}</p>
        </div>
      </div>
    </motion.div>
  );
}

function StepCard({ number, title, description }: any) {
  return (
    <div className="text-center max-w-sm mx-auto p-4">
      <div className="w-20 h-20 bg-emerald-200 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-50 rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-lg shadow-emerald-100 dark:shadow-emerald-900/50">
        {number}
      </div>
      <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-4">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{description}</p>
    </div>
  );
}