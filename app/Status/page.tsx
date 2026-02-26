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

    <div className="min-h-screen bg-slate-50 text-slate-900">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8 text-slate-900">
          My Requests
        </h1>

        {loading && (

          <div className="text-center py-10 text-slate-600">
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

    <div className="mb-10 text-slate-900">

      <h2 className="text-2xl font-bold mb-4 text-slate-900">
        {title}
      </h2>

      {complaints.length === 0 && (

        <div className="bg-white p-6 rounded-xl border text-slate-500">
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
            className="bg-white p-6 rounded-xl border hover:shadow-md transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <div className="font-bold text-lg text-slate-900">
                  {complaint.title}
                </div>

                <div className="text-sm text-slate-500 mt-1">
                  ID: {complaint.id}
                </div>

                {complaint.block && (

                  <div className="text-sm text-slate-600 mt-1">
                    {complaint.block} — Room {complaint.room}
                  </div>

                )}

                <div className="text-sm text-slate-500 mt-1">
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
      color: "bg-amber-100 text-amber-700",
      icon: Clock
    },

    "in-progress": {
      label: "In Progress",
      color: "bg-blue-100 text-blue-700",
      icon: TrendingUp
    },

    completed: {
      label: "Completed",
      color: "bg-emerald-100 text-emerald-700",
      icon: CheckCircle
    }

  };

  const { label, color, icon: Icon } =
    config[status as keyof typeof config];

  return (

    <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${color}`}>

      <Icon className="w-4 h-4" />

      {label}

    </div>

  );

}