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
  User,
  MapPin,
  History,
  FileText
} from "lucide-react";

import Navbar from "../navbar";
import { getComplaints } from "../lib/api";

export default function CurrentlyPage() {

  const [activeTab, setActiveTab] =
    useState<"active" | "previous">("active");

  const [complaints, setComplaints] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    loadComplaints();

  }, []);

  async function loadComplaints() {

    try {

      setLoading(true);

      const data = await getComplaints();

      const formatted = data.map((item: any) => {

        const lines = item.description.split("\n");

        let block = "";
        let room = "";

        lines.forEach((line: string) => {

          if (line.startsWith("Block:"))
            block = line.replace("Block:", "").trim();

          if (line.startsWith("Room:"))
            room = line.replace("Room:", "").trim();

        });

        return {

          id: item.complaintID,

          type: item.title.includes("Cleaning")
            ? "cleaning"
            : "maintenance",

          issue: item.title,

          cleaningType: item.title,

          block,

          room,

          status:
            item.status === "OPEN"
              ? "pending"
              : item.status === "IN_PROGRESS"
              ? "in-progress"
              : "completed",

          priority: "normal",

          submittedAt: new Date(
            item.createdAt
          ).toLocaleString(),

          description: item.description,

          assignedTo: null,

          eta: "Pending assignment",

          completedAt:
            item.status === "COMPLETED"
              ? new Date(item.createdAt).toLocaleString()
              : null

        };

      });

      setComplaints(formatted);

    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }

  const activeComplaints =
    complaints.filter(c => c.status !== "completed");

  const previousComplaints =
    complaints.filter(c => c.status === "completed");

  const displayComplaints =
    activeTab === "active"
      ? activeComplaints
      : previousComplaints;

  return (

    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold mb-6">
          My Requests
        </h1>

        {/* Tabs */}

        <div className="flex gap-4 mb-6">

          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-xl ${
              activeTab === "active"
                ? "bg-slate-900 text-white"
                : "bg-white"
            }`}
          >
            Active ({activeComplaints.length})
          </button>

          <button
            onClick={() => setActiveTab("previous")}
            className={`px-4 py-2 rounded-xl ${
              activeTab === "previous"
                ? "bg-slate-900 text-white"
                : "bg-white"
            }`}
          >
            Completed ({previousComplaints.length})
          </button>

        </div>

        {/* Loading */}

        {loading && (
          <div>Loading complaints...</div>
        )}

        {/* Error */}

        {error && (
          <div className="text-red-600">
            {error}
          </div>
        )}

        {/* List */}

        <div className="grid gap-4">

          {displayComplaints.map((complaint, index) => (

            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <div className="bg-white p-6 rounded-xl border">

                <div className="font-bold text-lg">
                  {complaint.issue}
                </div>

                <div className="text-sm text-gray-600">
                  {complaint.block} - Room {complaint.room}
                </div>

                <div className="text-sm mt-2">
                  Status: {complaint.status}
                </div>

                <div className="text-xs text-gray-500">
                  {complaint.submittedAt}
                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );

}