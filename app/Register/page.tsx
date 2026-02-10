"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Sparkles, ArrowRight, Clock, CheckCircle } from "lucide-react";
import Navbar from "../navbar";

export default function ComplaintPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-medium mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Quick & Easy Complaint Submission
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold text-slate-900 mb-4"
          >
            What do you need help with?
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Select the type of service you need and we'll get it resolved quickly
          </motion.p>
        </div>

        {/* Service Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          
          {/* Maintenance Card */}
          <Link href="/Maintenance">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group relative bg-white rounded-3xl border-2 border-slate-200 hover:border-slate-900 transition-all duration-300 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative p-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-slate-900 group-hover:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110">
                  <Wrench className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  Maintenance Request
                </h3>
                <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  Report issues with furniture, appliances, electrical, plumbing, WiFi, and other facilities
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-slate-700" />
                    </div>
                    Furniture repair & replacement
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-slate-700" />
                    </div>
                    Electrical & WiFi issues
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-slate-700" />
                    </div>
                    Water dispenser & plumbing
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-slate-700" />
                    </div>
                    Lift maintenance
                  </li>
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-2 text-slate-900 font-bold group-hover:gap-3 transition-all">
                  <span>Report Maintenance Issue</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          </Link>

          {/* Cleaning Card */}
          <Link href="/cleaning">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group relative bg-white rounded-3xl border-2 border-slate-200 hover:border-emerald-500 transition-all duration-300 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative p-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-emerald-500 group-hover:bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  Cleaning Request
                </h3>
                <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  Schedule room cleaning, washroom cleaning, floor cleaning, and other sanitation services
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-700" />
                    </div>
                    Room & washroom cleaning
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-700" />
                    </div>
                    Floor & corridor cleaning
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-700" />
                    </div>
                    Classroom cleaning
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-700" />
                    </div>
                    Deep cleaning services
                  </li>
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-2 text-emerald-700 font-bold group-hover:gap-3 transition-all">
                  <span>Request Cleaning Service</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          </Link>

        </div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2 text-lg">Fast Response Time</h4>
                <p className="text-blue-800 leading-relaxed">
                  Your request will be assigned to our team within 2 minutes. You'll receive real-time updates via notifications and can track the progress anytime from the "Currently" page.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm">
            Need urgent assistance? Call the hostel office at{" "}
            <span className="font-semibold text-slate-900">+91-XXXXXXXXXX</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}