"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  Filter,
  Search,
  UserPlus,
  Building
} from "lucide-react";

import Navbar from "../navbar";

// import {
//   getComplaints,
//   updateComplaintStatus
// } from "../lib/api";

const workers = [
  "Ramesh Kumar",
  "Suresh Yadav",
  "Mohan Lal",
  "Rajesh Verma",
  "Dinesh Gupta",
  "Prakash Singh"
];

export default function StaffDashboard() {

  const [complaints, setComplaints] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  const [showAssignModal, setShowAssignModal] = useState(false);

  const [selectedWorker, setSelectedWorker] = useState("");

  /* =========================
     LOAD COMPLAINTS FROM API
  ========================= */

  useEffect(() => {

    loadComplaints();

  }, []);

  async function loadComplaints() {

    try {

      setLoading(true);

      const data: any[] = []; // await getComplaints();

      const formatted = data.map((item: any) => {

        let block = "";
        let room = "";

        const lines = item.description.split("\n");

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

          studentName: "Student",

          status:
            item.status === "OPEN"
              ? "pending"
              : item.status === "IN_PROGRESS"
                ? "in-progress"
                : "completed",

          priority: "normal",

          submittedAt: new Date(item.createdAt)
            .toLocaleString(),

          assignedTo: null,

          description: item.description

        };

      });

      setComplaints(formatted);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  /* =========================
     UPDATE STATUS
  ========================= */

  async function handleStatusChange(id: string, newStatus: string) {

    try {

      const backendStatus =
        newStatus === "pending"
          ? "OPEN"
          : newStatus === "in-progress"
            ? "IN_PROGRESS"
            : "COMPLETED";

      // await updateComplaintStatus(id, backendStatus as any);

      await loadComplaints();

    } catch (error) {

      alert("Failed to update status");

    }

  }

  /* =========================
     ASSIGN WORKER
  ========================= */

  async function handleAssignWorker() {

    if (!selectedComplaint) return;

    try {

      // await updateComplaintStatus(
      //   selectedComplaint.id,
      //   "IN_PROGRESS"
      // );

      setShowAssignModal(false);

      setSelectedWorker("");

      await loadComplaints();

    } catch {

      alert("Assignment failed");

    }

  }

  /* =========================
     FILTERING
  ========================= */

  const filteredComplaints = complaints.filter(c => {

    const matchesFilter =
      selectedFilter === "all" ||
      c.status === selectedFilter;

    const matchesSearch =
      c.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;

  });

  const stats = {

    total: complaints.length,

    pending:
      complaints.filter(c => c.status === "pending").length,

    inProgress:
      complaints.filter(c => c.status === "in-progress").length,

    completed:
      complaints.filter(c => c.status === "completed").length

  };

  /* =========================
     UI
  ========================= */

  return (

    <div className="min-h-screen bg-slate-50 text-slate-900">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <h1 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight text-slate-900">
          Staff Dashboard
        </h1>

        {loading && (
          <div className="text-slate-600 mb-6">Loading complaints...</div>
        )}

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 p-4 sm:p-8 overflow-hidden">

          <table className="w-full text-slate-800">

            <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 uppercase tracking-widest text-[11px] font-black">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">ID</th>
                <th className="py-3 px-4 text-left font-semibold">Issue</th>
                <th className="py-3 px-4 text-left font-semibold">Block</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-left font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredComplaints.map(c => (

                <tr key={c.id} className="hover:bg-slate-50 transition-colors">

                  <td className="py-3 px-4">{c.id}</td>

                  <td className="py-3 px-4 font-medium text-slate-900">{c.issue}</td>

                  <td className="py-3 px-4 text-slate-600">{c.block}</td>

                  <td className="py-3 px-4 capitalize text-slate-700">{c.status}</td>

                  <td className="py-3 px-4">

                    {c.status === "pending" && (

                      <button
                        className="bg-[#BAF1D4] text-[#064E3B] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-300 transition-colors shadow-sm"
                        onClick={() => {
                          setSelectedComplaint(c);
                          setShowAssignModal(true);
                        }}
                      >
                        Assign
                      </button>

                    )}

                    {c.status === "in-progress" && (

                      <button
                        className="bg-[#059669] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                        onClick={() =>
                          handleStatusChange(
                            c.id,
                            "completed"
                          )
                        }
                      >
                        Complete
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {showAssignModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm z-50">

          <div className="bg-white p-8 rounded-[32px] w-full max-w-sm shadow-2xl border border-slate-100/60">

            <h2 className="text-2xl font-black mb-6 tracking-tight text-slate-900">Select Worker</h2>

            <select
              className="w-full px-5 py-4 border border-slate-200 rounded-full text-slate-800 mb-6 bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              value={selectedWorker}
              onChange={(e) =>
                setSelectedWorker(e.target.value)
              }
            >

              <option value="">Select</option>

              {workers.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}

            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-6 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors font-bold"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-400 text-emerald-950 px-6 py-3 rounded-full hover:bg-emerald-500 transition-all font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAssignWorker}
                disabled={!selectedWorker}
              >
                Assign
              </button>
            </div>

          </div>

        </div>

      )}

    </div>

  );

}