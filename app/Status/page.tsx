"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  TrendingUp,
  Wrench,
  Sparkles,
  Calendar,
  MapPin,
  FileText,
  AlertCircle
} from "lucide-react";

import Navbar from "../navbar";
import { getComplaints } from "../lib/api";

export default function StatusPage() {

  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD COMPLAINTS FROM API
  ========================= */

  useEffect(() => {
    loadComplaints();
  }, []);

  async function loadComplaints() {

    try {

      setLoading(true);

      const data = await getComplaints();

      const formatted = data.map((item: any) => {

        let block = "";
        let room = "";

        if (item.description) {

          const lines = item.description.split("\n");

          lines.forEach((line: string) => {

            if (line.startsWith("Block:"))
              block = line.replace("Block:", "").trim();

            if (line.startsWith("Room:"))
              room = line.replace("Room:", "").trim();

          });

        }

        return {

          id: item.complaintID,

          type: item.title.includes("Cleaning")
            ? "cleaning"
            : "maintenance",

          title: item.title,

          description: item.description,

          block,
          room,

          status:
            item.status === "OPEN"
              ? "pending"
              : item.status === "IN_PROGRESS"
                ? "in-progress"
                : "completed",

          createdAt: new Date(item.createdAt)
            .toLocaleString()

        };

      });

      setComplaints(formatted);

    } catch (error) {

      console.error(error);
      alert("Failed to load complaints");

    } finally {

      setLoading(false);

    }

  }

  /* =========================
     SPLIT ACTIVE & COMPLETED
  ========================= */

  const activeComplaints =
    complaints.filter(c => c.status !== "completed");

  const completedComplaints =
    complaints.filter(c => c.status === "completed");

  /* =========================
     UI
  ========================= */

  return (

    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8 text-slate-900 dark:text-white">
          My Requests
        </h1>

        {loading && (

          <div className="text-center py-10 text-slate-600 dark:text-slate-400">
            Loading complaints...
          </div>

        )}

        {/* ACTIVE */}

        <Section
          title="Active Requests"
          complaints={activeComplaints}
        />

        {/* COMPLETED */}

        <Section
          title="Completed Requests"
          complaints={completedComplaints}
        />

      </div>

    </div>

  );

}

/* =========================
   SECTION COMPONENT
========================= */

function Section({ title, complaints }: any) {

  return (

    <div className="mb-10 text-slate-900 dark:text-slate-100">

      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
        <div className="w-2 h-8 bg-emerald-400 rounded-full"></div>
        {title}
      </h2>

      {complaints.length === 0 && (

        <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm text-slate-500 dark:text-slate-400 text-center font-medium">
          No requests found
        </div>

      )}

      <div className="space-y-4">

        {complaints.map((complaint: any, index: number) => (

          <motion.div
            key={complaint.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[32px] border border-slate-100/80 dark:border-slate-800/80 shadow-sm dark:shadow-none hover:border-[#BAF1D4] dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-[#BAF1D4]/40 dark:hover:shadow-emerald-900/20 transition-all duration-300"
          >

            <div className="flex justify-between items-start">

              <div>

                <div className="font-black text-xl text-slate-900 dark:text-white tracking-tight">
                  {complaint.title}
                </div>

                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  ID: {complaint.id}
                </div>

                {complaint.block && (

                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {complaint.block} — Room {complaint.room}
                  </div>

                )}

                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Submitted: {complaint.createdAt}
                </div>

              </div>

              <StatusBadge status={complaint.status} />

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  );

}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }: { status: string }) {

  const config = {

    pending: {
      label: "Pending",
      color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/30",
      icon: Clock
    },

    "in-progress": {
      label: "In Progress",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30",
      icon: TrendingUp
    },

    completed: {
      label: "Completed",
      color: "bg-[#E5F7EB] dark:bg-emerald-900/30 text-[#059669] dark:text-emerald-400 border border-[#BAF1D4]/50 dark:border-emerald-800/50",
      icon: CheckCircle
    }

  };

  const { label, color, icon: Icon } =
    config[status as keyof typeof config];

  return (

    <div className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black flex items-center gap-1.5 ${color}`}>
      <Icon className="w-3.5 h-3.5" />

      {label}

    </div>

  );

}