"use client";

import { useState } from "react";
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

// Sample user complaints (in real app, this would come from API based on logged-in user)
const userComplaints = {
  active: [
    {
      id: "C001",
      type: "maintenance",
      issue: "Furniture Repair and Change",
      block: "C4 Block",
      room: "204",
      status: "in-progress",
      priority: "high",
      submittedAt: "Feb 8, 2026 - 10:30 AM",
      description: "Chair is broken, needs replacement",
      assignedTo: "Ramesh Kumar",
      eta: "Today, 5:00 PM"
    },
    {
      id: "C003",
      type: "maintenance",
      issue: "WiFi",
      block: "C4 Block",
      room: "204",
      status: "pending",
      priority: "urgent",
      submittedAt: "Feb 8, 2026 - 11:45 AM",
      description: "No WiFi connectivity in room",
      assignedTo: null,
      eta: "Will be assigned soon"
    }
  ],
  previous: [
    {
      id: "C102",
      type: "cleaning",
      cleaningType: "Room Clean",
      block: "C4 Block",
      room: "204",
      status: "completed",
      priority: "normal",
      submittedAt: "Feb 5, 2026 - 9:00 AM",
      completedAt: "Feb 5, 2026 - 11:30 AM",
      description: "Regular room cleaning",
      assignedTo: "Suresh Yadav"
    },
    {
      id: "C087",
      type: "maintenance",
      issue: "Water Dispenser Issue",
      block: "C4 Block",
      room: "204",
      status: "completed",
      priority: "medium",
      submittedAt: "Feb 1, 2026 - 2:00 PM",
      completedAt: "Feb 1, 2026 - 4:45 PM",
      description: "Water dispenser not cooling",
      assignedTo: "Mohan Lal"
    },
    {
      id: "C065",
      type: "cleaning",
      cleaningType: "Washroom Clean",
      block: "C4 Block",
      room: "204",
      status: "completed",
      priority: "normal",
      submittedAt: "Jan 28, 2026 - 3:30 PM",
      completedAt: "Jan 28, 2026 - 5:00 PM",
      description: "Deep cleaning requested",
      assignedTo: "Suresh Yadav"
    }
  ]
};

export default function CurrentlyPage() {
  const [activeTab, setActiveTab] = useState<"active" | "previous">("active");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  const complaints = activeTab === "active" ? userComplaints.active : userComplaints.previous;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Requests</h1>
          <p className="text-slate-600">View and track all your maintenance and cleaning requests</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon={<TrendingUp className="w-6 h-6" />}
            label="Active Requests"
            value={userComplaints.active.length}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard 
            icon={<Clock className="w-6 h-6" />}
            label="Pending"
            value={userComplaints.active.filter(c => c.status === "pending").length}
            color="bg-amber-100 text-amber-600"
          />
          <StatCard 
            icon={<CheckCircle className="w-6 h-6" />}
            label="Completed"
            value={userComplaints.previous.length}
            color="bg-emerald-100 text-emerald-600"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 mb-6 inline-flex gap-2">
          <TabButton
            icon={<FileText className="w-4 h-4" />}
            label="Active Requests"
            count={userComplaints.active.length}
            active={activeTab === "active"}
            onClick={() => setActiveTab("active")}
          />
          <TabButton
            icon={<History className="w-4 h-4" />}
            label="Previous Requests"
            count={userComplaints.previous.length}
            active={activeTab === "previous"}
            onClick={() => setActiveTab("previous")}
          />
        </div>

        {/* Complaints List */}
        <div className="grid gap-6">
          {complaints.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No {activeTab} requests</h3>
              <p className="text-slate-600">
                {activeTab === "active" 
                  ? "You don't have any active requests at the moment."
                  : "You haven't submitted any requests yet."}
              </p>
            </div>
          ) : (
            complaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ComplaintCard 
                  complaint={complaint}
                  onClick={() => setSelectedComplaint(complaint)}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
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

function TabButton({ icon, label, count, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition ${
        active
          ? "bg-slate-900 text-white shadow-lg"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {icon}
      {label}
      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
        active ? "bg-white/20" : "bg-slate-100"
      }`}>
        {count}
      </span>
    </button>
  );
}

function ComplaintCard({ complaint, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 p-6 cursor-pointer transition-all hover:shadow-lg group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xl font-bold text-slate-900">{complaint.id}</span>
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} size="small" />
          </div>
          
          <div className="flex items-center gap-2 text-slate-600 mb-3">
            {complaint.type === "maintenance" ? (
              <>
                <Wrench className="w-4 h-4" />
                <span className="font-semibold">{complaint.issue}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">{complaint.cleaningType}</span>
              </>
            )}
          </div>

          {complaint.description && (
            <p className="text-sm text-slate-600 mb-4">{complaint.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4" />
              <span>{complaint.block}, Room {complaint.room}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>{complaint.submittedAt}</span>
            </div>
            {complaint.assignedTo && (
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4" />
                <span>{complaint.assignedTo}</span>
              </div>
            )}
          </div>
        </div>

        {complaint.status !== "completed" && (
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">ETA</div>
            <div className="text-sm font-bold text-slate-900">{complaint.eta}</div>
          </div>
        )}
        {complaint.status === "completed" && (
          <div className="text-right">
            <div className="text-xs font-semibold text-emerald-600 uppercase mb-1">Completed</div>
            <div className="text-sm font-bold text-emerald-700">{complaint.completedAt}</div>
          </div>
        )}
      </div>

      <div className="text-sm text-blue-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
        View Details →
      </div>
    </div>
  );
}

function ComplaintModal({ complaint, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-2xl font-bold text-slate-900">{complaint.id}</span>
              <StatusBadge status={complaint.status} />
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              {complaint.type === "maintenance" ? (
                <>
                  <Wrench className="w-5 h-5" />
                  <span className="font-semibold text-lg">{complaint.issue}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold text-lg">{complaint.cleaningType}</span>
                </>
              )}
            </div>
          </div>
          <PriorityBadge priority={complaint.priority} />
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <DetailItem
            icon={<MapPin className="w-5 h-5" />}
            label="Location"
            value={`${complaint.block}, Room ${complaint.room}`}
          />
          <DetailItem
            icon={<User className="w-5 h-5" />}
            label="Assigned To"
            value={complaint.assignedTo || "Not assigned yet"}
          />
          <DetailItem
            icon={<Calendar className="w-5 h-5" />}
            label="Submitted"
            value={complaint.submittedAt}
          />
          <DetailItem
            icon={<Clock className="w-5 h-5" />}
            label={complaint.status === "completed" ? "Completed" : "ETA"}
            value={complaint.completedAt || complaint.eta}
          />
        </div>

        {/* Description */}
        {complaint.description && (
          <div className="mb-6 p-4 bg-slate-50 rounded-xl">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Description</div>
            <p className="text-slate-700">{complaint.description}</p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

function DetailItem({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <div className="text-slate-600">{icon}</div>
      </div>
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase mb-0.5">{label}</div>
        <div className="font-semibold text-slate-900">{value}</div>
      </div>
    </div>
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

function PriorityBadge({ priority, size = "normal" }: { priority: string, size?: string }) {
  const config = {
    urgent: { color: "bg-red-100 text-red-700 border-red-200", label: "🔥 Urgent" },
    high: { color: "bg-orange-100 text-orange-700 border-orange-200", label: "⚡ High" },
    medium: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "⚠️ Medium" },
    normal: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "📌 Normal" }
  };

  const { color, label } = config[priority as keyof typeof config];
  const sizeClass = size === "small" ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm";

  return (
    <span className={`inline-flex ${sizeClass} rounded-xl font-bold border-2 ${color}`}>
      {label}
    </span>
  );
}