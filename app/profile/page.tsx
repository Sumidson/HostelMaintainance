"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building,
  History,
  Settings,
  LogOut,
  Edit,
  Wrench,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  Shield
} from "lucide-react";
import Navbar from "../navbar";

// Sample user data
const userData = {
  name: "Rahul Sharma",
  email: "rahul.sharma@bennett.edu.in",
  phone: "+91 98765 43210",
  studentId: "E21CSEU1234",
  block: "C4 Block",
  room: "204",
  joinedDate: "August 2021",
  totalRequests: 12,
  completedRequests: 9,
  activeRequests: 3
};

// Sample service history
const serviceHistory = [
  {
    id: "C001",
    type: "maintenance",
    issue: "Furniture Repair and Change",
    date: "Feb 8, 2026",
    status: "completed",
    assignedTo: "Ramesh Kumar",
    completedIn: "6 hours",
    rating: 5
  },
  {
    id: "C102",
    type: "cleaning",
    cleaningType: "Room Clean",
    date: "Feb 5, 2026",
    status: "completed",
    assignedTo: "Suresh Yadav",
    completedIn: "2 hours",
    rating: 4
  },
  {
    id: "C087",
    type: "maintenance",
    issue: "Water Dispenser Issue",
    date: "Feb 1, 2026",
    status: "completed",
    assignedTo: "Mohan Lal",
    completedIn: "4 hours",
    rating: 5
  },
  {
    id: "C065",
    type: "cleaning",
    cleaningType: "Washroom Clean",
    date: "Jan 28, 2026",
    status: "completed",
    assignedTo: "Suresh Yadav",
    completedIn: "3 hours",
    rating: 5
  },
  {
    id: "C051",
    type: "maintenance",
    issue: "WiFi",
    date: "Jan 22, 2026",
    status: "completed",
    assignedTo: "Rajesh Verma",
    completedIn: "1 hour",
    rating: 4
  },
  {
    id: "C038",
    type: "cleaning",
    cleaningType: "Floor Clean",
    date: "Jan 15, 2026",
    status: "completed",
    assignedTo: "Dinesh Gupta",
    completedIn: "2 hours",
    rating: 5
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "history">("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden sticky top-24"
            >
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 text-white text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <User className="w-12 h-12 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
                <p className="text-indigo-100 text-sm font-medium">{userData.studentId}</p>
              </div>

              {/* Profile Details */}
              <div className="p-6 space-y-4">
                <DetailRow icon={<Mail className="w-5 h-5" />} label="Email" value={userData.email} />
                <DetailRow icon={<Phone className="w-5 h-5" />} label="Phone" value={userData.phone} />
                <DetailRow icon={<Building className="w-5 h-5" />} label="Block" value={userData.block} />
                <DetailRow icon={<MapPin className="w-5 h-5" />} label="Room" value={userData.room} />
                <DetailRow icon={<Calendar className="w-5 h-5" />} label="Joined" value={userData.joinedDate} />
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition">
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2">
            
            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-2 mb-6 inline-flex gap-2">
              <TabButton
                icon={<TrendingUp className="w-4 h-4" />}
                label="Overview"
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
              />
              <TabButton
                icon={<History className="w-4 h-4" />}
                label="Service History"
                active={activeTab === "history"}
                onClick={() => setActiveTab("history")}
              />
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <StatCard
                    icon={<Wrench className="w-6 h-6" />}
                    label="Total Requests"
                    value={userData.totalRequests}
                    color="bg-blue-100 text-blue-600"
                  />
                  <StatCard
                    icon={<CheckCircle className="w-6 h-6" />}
                    label="Completed"
                    value={userData.completedRequests}
                    color="bg-emerald-100 text-emerald-600"
                  />
                  <StatCard
                    icon={<Clock className="w-6 h-6" />}
                    label="Active"
                    value={userData.activeRequests}
                    color="bg-amber-100 text-amber-600"
                  />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <QuickActionCard
                      icon={<Wrench className="w-6 h-6" />}
                      title="New Maintenance Request"
                      description="Report an issue"
                      href="/maintenance"
                      color="bg-slate-900"
                    />
                    <QuickActionCard
                      icon={<Sparkles className="w-6 h-6" />}
                      title="Request Cleaning"
                      description="Schedule service"
                      href="/cleaning"
                      color="bg-emerald-500"
                    />
                  </div>
                </div>

                {/* Account Info */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-100 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-900 mb-2 text-lg">Account Status: Verified</h4>
                      <p className="text-indigo-700 leading-relaxed">
                        Your account is verified and you have full access to all hostel services. Average response time: &lt; 2 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Service History Tab */}
            {activeTab === "history" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Past Services</h3>
                      <p className="text-slate-600 text-sm mt-1">Your complete service history</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-slate-900">{serviceHistory.length}</div>
                      <div className="text-sm text-slate-500">Total Services</div>
                    </div>
                  </div>
                </div>

                {serviceHistory.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function DetailRow({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <div className="text-slate-600">{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-slate-500 uppercase">{label}</div>
        <div className="font-semibold text-slate-900 truncate">{value}</div>
      </div>
    </div>
  );
}

function TabButton({ icon, label, active, onClick }: any) {
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
    </button>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}

function QuickActionCard({ icon, title, description, href, color }: any) {
  return (
    <a href={href} className="block group">
      <div className={`${color} text-white p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer`}>
        <div className="mb-4">{icon}</div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </a>
  );
}

function ServiceCard({ service }: any) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-6 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-lg font-bold text-slate-900">{service.id}</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border-2 bg-emerald-100 text-emerald-700 border-emerald-200">
              <CheckCircle className="w-3 h-3" />
              Completed
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-slate-600 mb-3">
            {service.type === "maintenance" ? (
              <>
                <Wrench className="w-4 h-4" />
                <span className="font-semibold">{service.issue}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">{service.cleaningType}</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{service.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{service.assignedTo}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Completed in {service.completedIn}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="text-right">
          <div className="flex gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < service.rating ? "text-yellow-400" : "text-slate-300"}>
                ★
              </span>
            ))}
          </div>
          <div className="text-xs text-slate-500">{service.rating}/5 rating</div>
        </div>
      </div>
    </div>
  );
}