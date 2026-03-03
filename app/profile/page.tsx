"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Shield,
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText
} from "lucide-react";

import Navbar from "../navbar";
import { getComplaints } from "../lib/api";

import {
  fetchUserAttributes,
  signOut
} from "aws-amplify/auth";

export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "history">("overview");
  const [errorMsg, setErrorMsg] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0
  });

  /* =========================
     LOAD USER + COMPLAINTS
  ========================= */

  useEffect(() => {
    loadUserAndComplaints();
  }, []);

  async function loadUserAndComplaints() {

    try {
      const attributes = await fetchUserAttributes();
      const rawEmail = attributes.email || "";
      const email = rawEmail.toLowerCase().trim();

      let data: any[] = [];
      try {
        data = await getComplaints();
      } catch (err: any) {
        console.error("Profile API Error:", err);
        setErrorMsg("Your history could not be loaded. Please ensure there are no corrupted items in your database.");
      }

      // filter only this user's complaints
      const myComplaints = data.filter(
        (c: any) =>
          (c.userEmail && c.userEmail.toLowerCase().trim() === email) ||
          (c.email && c.email.toLowerCase().trim() === email)
      );

      setComplaints(myComplaints);

      const completed = myComplaints.filter(
        (c: any) => c.status === "COMPLETED"
      ).length;

      const active = myComplaints.filter(
        (c: any) =>
          c.status === "OPEN" ||
          c.status === "IN_PROGRESS"
      ).length;

      setStats({
        total: myComplaints.length,
        completed,
        active
      });

      setUser({
        name:
          attributes.name ||
          attributes.email?.split("@")[0] ||
          "User",
        email: rawEmail,
        phone:
          attributes.phone_number ||
          "Not provided",
        studentId:
          attributes.sub?.slice(0, 8) ||
          "N/A",
        block: "Hostel",
        room: "—",
        joinedDate: "—"
      });

    } catch (error) {
      console.error("Cognito Auth Error:", error);
      setErrorMsg("Failed to authenticate user profile.");
    } finally {
      setLoading(false);
    }

  }

  /* =========================
     LOGOUT
  ========================= */

  async function handleLogout() {
    await signOut();
    window.location.href = "/auth/login";
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-950 dark:text-white transition-colors">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-emerald-200 dark:bg-emerald-900/50 rounded-full"></div>
          <div className="text-slate-500 font-bold tracking-wide">Loading Profile...</div>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-950 dark:text-white transition-colors">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Login Required</h1>
        <p className="text-slate-500 mb-6 text-center max-w-sm">
          {errorMsg || "You need to be signed in to view your profile and request history."}
        </p>
        <button
          onClick={() => window.location.href = "/auth/login"}
          className="bg-emerald-500 text-white px-8 py-3 rounded-full font-bold shadow-lg"
        >
          Go to Login
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors"
          >

            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center border border-emerald-100 dark:border-emerald-800/50">
                <User className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {user.name}
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                Student ID: {user.studentId}
              </p>
            </div>

            <div className="space-y-2">
              <DetailRow icon={<Mail className="dark:text-emerald-400" />} label="Email Address" value={user.email} />
              <DetailRow icon={<Phone className="dark:text-emerald-400" />} label="Phone Number" value={user.phone} />
              <DetailRow icon={<Building className="dark:text-emerald-400" />} label="Hostel Block" value={user.block} />
              <DetailRow icon={<MapPin className="dark:text-emerald-400" />} label="Room Number" value={user.room} />
              <DetailRow icon={<Calendar className="dark:text-emerald-400" />} label="Joined Date" value={user.joinedDate} />
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-8 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 py-3.5 rounded-full transition-colors font-bold tracking-wide"
            >
              Sign Out
            </button>

          </motion.div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* TABS */}
            <div className="flex gap-2 border-b-2 border-slate-100 dark:border-slate-800 pb-0">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-4 font-black text-sm uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${activeTab === "overview" ? "text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400" : "text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-transparent"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-6 py-4 font-black text-sm uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${activeTab === "history" ? "text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400" : "text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-transparent"}`}
              >
                Request History
              </button>
            </div>

            {errorMsg && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm font-medium border border-red-100 dark:border-red-900/30">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            {activeTab === "overview" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-4"
              >
                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  <StatCard
                    icon={<Wrench className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                    label="Total Requests"
                    value={stats.total}
                  />

                  <StatCard
                    icon={<CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                    label="Completed"
                    value={stats.completed}
                  />

                  <StatCard
                    icon={<Clock className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                    label="Active"
                    value={stats.active}
                  />

                </div>

                {/* ACCOUNT VERIFIED */}
                <div className="bg-[#BAF1D4]/40 dark:bg-emerald-900/20 border border-[#BAF1D4]/80 dark:border-emerald-900/30 p-8 rounded-[32px] flex items-center gap-6 transition-colors shadow-sm">

                  <div className="p-4 bg-white dark:bg-emerald-800/40 rounded-full shadow-sm">
                    <Shield className="text-[#059669] dark:text-emerald-400 w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="font-black text-2xl text-slate-900 dark:text-white tracking-tight">
                      Account Verified
                    </h4>
                    <p className="text-slate-600 dark:text-emerald-100/60 font-medium mt-1">
                      Your identity is secured by Hostel Auth Protocols.
                    </p>
                  </div>

                </div>

              </motion.div>
            ) : (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-4"
              >
                {complaints.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 p-12 rounded-[32px] border border-slate-100 dark:border-slate-800 text-center transition-colors shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No History</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">You haven't made any requests yet.</p>
                  </div>
                ) : (
                  complaints.map((c: any, index: number) => (
                    <div key={c.complaintID || index} className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-emerald-200 dark:hover:border-emerald-800/50 hover:shadow-md">

                      <div>
                        <div className="font-black text-lg text-slate-900 dark:text-white tracking-tight">{c.title || "Untitled Request"}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex flex-col gap-1 font-medium">
                          <span>ID: <span className="text-slate-600 dark:text-slate-300">{c.complaintID}</span></span>
                          <span>Date: <span className="text-slate-600 dark:text-slate-300">{c.createdAt ? new Date(c.createdAt).toLocaleString() : "Unknown"}</span></span>
                        </div>
                      </div>

                      <div className={`px-4 py-2 text-xs font-black rounded-full uppercase tracking-wider ${c.status === "COMPLETED" ? "bg-[#E5F7EB] text-[#059669] dark:bg-emerald-900/30 dark:text-emerald-400" :
                        c.status === "IN_PROGRESS" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                          "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}>
                        {c.status || "PENDING"}
                      </div>

                    </div>
                  ))
                )}
              </motion.div>
            )}

          </div>

        </div>

        <div className="mt-12 text-center text-sm font-medium text-slate-400 dark:text-slate-500 pb-8">
          Made by sumidson
        </div>

      </div>

    </div>

  );

}

/* COMPONENTS */

function DetailRow({ icon, label, value }: any) {

  return (

    <div className="flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors items-center">

      <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-400">
        {icon}
      </div>

      <div className="flex-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </div>
        <div className="font-semibold text-slate-900 dark:text-slate-200">
          {value}
        </div>
      </div>

    </div>

  );

}

function StatCard({ icon, label, value }: any) {

  return (

    <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center transition-colors">

      <div className="w-14 h-14 bg-[#BAF1D4]/30 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>

      <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
        {value}
      </div>

      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase mt-2 tracking-widest">
        {label}
      </div>

    </div>

  );

}