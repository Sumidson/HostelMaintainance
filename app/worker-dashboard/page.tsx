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

    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <h1 className="text-4xl font-bold mb-6">
          Staff Dashboard
        </h1>

        {loading && (
          <div>Loading complaints...</div>
        )}

        {/* TABLE */}

        <div className="bg-white rounded-xl border">

          <table className="w-full">

            <thead>
              <tr>
                <th>ID</th>
                <th>Issue</th>
                <th>Block</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredComplaints.map(c => (

                <tr key={c.id}>

                  <td>{c.id}</td>

                  <td>{c.issue}</td>

                  <td>{c.block}</td>

                  <td>{c.status}</td>

                  <td>

                    {c.status === "pending" && (

                      <button
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

      {/* ASSIGN MODAL */}

      {showAssignModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

          <div className="bg-white p-6 rounded-xl">

            <h2>Select Worker</h2>

            <select
              value={selectedWorker}
              onChange={(e) =>
                setSelectedWorker(e.target.value)
              }
            >

              <option>Select</option>

              {workers.map(w => (
                <option key={w}>{w}</option>
              ))}

            </select>

            <button onClick={handleAssignWorker}>
              Assign
            </button>

          </div>

        </div>

      )}

    </div>

  );

}