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

        <h1 className="text-4xl font-bold mb-6 text-slate-900">
          Staff Dashboard
        </h1>

        {loading && (
          <div className="text-slate-600 mb-6">Loading complaints...</div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

          <table className="w-full text-slate-800">

            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
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
                        className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm hover:bg-slate-800 transition-colors"
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
                        className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
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

          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl border border-slate-200">

            <h2 className="text-xl font-bold mb-4 text-slate-900">Select Worker</h2>

            <select
              className="w-full border border-slate-300 rounded-lg p-3 text-slate-800 mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
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

            <div className="flex justify-end gap-3 mt-2">
              <button
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors font-medium disabled:opacity-50"
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