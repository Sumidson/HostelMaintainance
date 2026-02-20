"use client";

import { useState } from "react";
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
  Calendar,
  Building
} from "lucide-react";
import Navbar from "../navbar";

// Sample data for complaints
const sampleComplaints = [
  {
    id: "C001",
    type: "maintenance",
    issue: "Furniture Repair and Change",
    block: "C4 Block",
    room: "204",
    studentName: "Rahul Sharma",
    status: "pending",
    priority: "high",
    submittedAt: "2 hours ago",
    description: "Chair is broken, needs replacement"
  },
  {
    id: "C002",
    type: "cleaning",
    cleaningType: "Washroom Clean",
    block: "N Block",
    room: "315",
    studentName: "Priya Patel",
    status: "in-progress",
    priority: "medium",
    submittedAt: "5 hours ago",
    assignedTo: "Ramesh Kumar",
    description: "Deep cleaning required"
  },
  {
    id: "C003",
    type: "maintenance",
    issue: "WiFi",
    block: "D2 Block",
    room: "101",
    studentName: "Amit Singh",
    status: "pending",
    priority: "urgent",
    submittedAt: "30 mins ago",
    description: "No WiFi connectivity in room"
  },
  {
    id: "C004",
    type: "cleaning",
    cleaningType: "Room Clean",
    block: "A Block",
    room: "512",
    studentName: "Sneha Reddy",
    status: "completed",
    priority: "normal",
    submittedAt: "1 day ago",
    assignedTo: "Suresh Yadav",
    description: "Regular cleaning"
  },
  {
    id: "C005",
    type: "maintenance",
    issue: "Water Dispenser Issue",
    block: "C1 Block",
    room: "Common Area",
    studentName: "Vikram Joshi",
    status: "in-progress",
    priority: "high",
    submittedAt: "3 hours ago",
    assignedTo: "Mohan Lal",
    description: "Water dispenser not working"
  }
];

const workers = [
  "Ramesh Kumar",
  "Suresh Yadav",
  "Mohan Lal",
  "Rajesh Verma",
  "Dinesh Gupta",
  "Prakash Singh"
];

export default function StaffDashboard() {
  const [complaints, setComplaints] = useState(sampleComplaints);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");

  // Filter complaints
  const filteredComplaints = complaints.filter(complaint => {
    const matchesFilter = selectedFilter === "all" || complaint.status === selectedFilter;
    const matchesSearch = 
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Statistics
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === "pending").length,
    inProgress: complaints.filter(c => c.status === "in-progress").length,
    completed: complaints.filter(c => c.status === "completed").length
  };

  const handleAssignWorker = () => {
    if (selectedComplaint && selectedWorker) {
      setComplaints(complaints.map(c => 
        c.id === selectedComplaint.id 
          ? { ...c, assignedTo: selectedWorker, status: "in-progress" }
          : c
      ));
      setShowAssignModal(false);
      setSelectedWorker("");
      setSelectedComplaint(null);
    }
  };

  const handleStatusChange = (complaintId: string, newStatus: string) => {
    setComplaints(complaints.map(c => 
      c.id === complaintId ? { ...c, status: newStatus } : c
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Staff Dashboard</h1>
          <p className="text-slate-600">Manage and assign maintenance & cleaning requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<Wrench className="w-6 h-6" />}
            label="Total Requests"
            value={stats.total}
            color="bg-slate-100 text-slate-600"
          />
          <StatCard 
            icon={<Clock className="w-6 h-6" />}
            label="Pending"
            value={stats.pending}
            color="bg-amber-100 text-amber-600"
          />
          <StatCard 
            icon={<TrendingUp className="w-6 h-6" />}
            label="In Progress"
            value={stats.inProgress}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard 
            icon={<CheckCircle className="w-6 h-6" />}
            label="Completed"
            value={stats.completed}
            color="bg-emerald-100 text-emerald-600"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, student, or block..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <FilterButton 
                label="All" 
                count={stats.total}
                active={selectedFilter === "all"}
                onClick={() => setSelectedFilter("all")}
              />
              <FilterButton 
                label="Pending" 
                count={stats.pending}
                active={selectedFilter === "pending"}
                onClick={() => setSelectedFilter("pending")}
                color="amber"
              />
              <FilterButton 
                label="In Progress" 
                count={stats.inProgress}
                active={selectedFilter === "in-progress"}
                onClick={() => setSelectedFilter("in-progress")}
                color="blue"
              />
              <FilterButton 
                label="Completed" 
                count={stats.completed}
                active={selectedFilter === "completed"}
                onClick={() => setSelectedFilter("completed")}
                color="emerald"
              />
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Issue/Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredComplaints.map((complaint, index) => (
                  <motion.tr 
                    key={complaint.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-semibold text-slate-900">
                        {complaint.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        complaint.type === "maintenance" 
                          ? "bg-slate-100 text-slate-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {complaint.type === "maintenance" ? <Wrench className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                        {complaint.type === "maintenance" ? "Maintenance" : "Cleaning"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">
                        {complaint.type === "maintenance" ? complaint.issue : complaint.cleaningType}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{complaint.submittedAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-sm text-slate-700">
                        <Building className="w-4 h-4 text-slate-400" />
                        {complaint.block}
                      </div>
                      <div className="text-xs text-slate-500">Room {complaint.room}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-900">{complaint.studentName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PriorityBadge priority={complaint.priority} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {complaint.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-slate-600" />
                          </div>
                          <span className="text-sm text-slate-700">{complaint.assignedTo}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {complaint.status === "pending" && (
                          <button
                            onClick={() => {
                              setSelectedComplaint(complaint);
                              setShowAssignModal(true);
                            }}
                            className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1"
                          >
                            <UserPlus className="w-3 h-3" />
                            Assign
                          </button>
                        )}
                        {complaint.status === "in-progress" && (
                          <button
                            onClick={() => handleStatusChange(complaint.id, "completed")}
                            className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-semibold hover:bg-emerald-600 transition flex items-center gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredComplaints.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No complaints found</p>
            </div>
          )}
        </div>

      </div>

      {/* Assign Worker Modal */}
      {showAssignModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Assign Worker</h3>
            
            {/* Complaint Details */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Complaint Details</div>
              <div className="space-y-1">
                <div className="text-sm"><span className="font-semibold">ID:</span> {selectedComplaint.id}</div>
                <div className="text-sm"><span className="font-semibold">Type:</span> {selectedComplaint.type === "maintenance" ? selectedComplaint.issue : selectedComplaint.cleaningType}</div>
                <div className="text-sm"><span className="font-semibold">Location:</span> {selectedComplaint.block}, Room {selectedComplaint.room}</div>
                <div className="text-sm"><span className="font-semibold">Student:</span> {selectedComplaint.studentName}</div>
              </div>
            </div>

            {/* Worker Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Select Worker
              </label>
              <select
                value={selectedWorker}
                onChange={(e) => setSelectedWorker(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900 bg-white"
              >
                <option value="">Choose a worker</option>
                {workers.map((worker) => (
                  <option key={worker} value={worker}>{worker}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedComplaint(null);
                  setSelectedWorker("");
                }}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignWorker}
                disabled={!selectedWorker}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign Worker
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ===== COMPONENTS ===== */

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}

function FilterButton({ label, count, active, onClick, color = "slate" }: any) {
  const colorClasses = {
    slate: active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200",
    amber: active ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-600 hover:bg-amber-100",
    blue: active ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100",
    emerald: active ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      {label} ({count})
    </button>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const config = {
    urgent: { color: "bg-red-100 text-red-700 border-red-200", label: "Urgent" },
    high: { color: "bg-orange-100 text-orange-700 border-orange-200", label: "High" },
    medium: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Medium" },
    normal: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Normal" }
  };

  const { color, label } = config[priority as keyof typeof config];

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    pending: { color: "bg-amber-100 text-amber-700 border-amber-200", label: "Pending", icon: Clock },
    "in-progress": { color: "bg-blue-100 text-blue-700 border-blue-200", label: "In Progress", icon: TrendingUp },
    completed: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Completed", icon: CheckCircle }
  };

  const { color, label, icon: Icon } = config[status as keyof typeof config];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}