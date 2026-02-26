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
  Edit,
  Settings,
  LogOut,
  Wrench,
  Sparkles,
  Clock,
  CheckCircle,
  TrendingUp,
  History
} from "lucide-react";

import Navbar from "../navbar";

import {
  fetchUserAttributes,
  signOut
} from "aws-amplify/auth";

export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState<"overview" | "history">("overview");

  /* =========================
     LOAD USER FROM COGNITO
  ========================= */

  useEffect(() => {

    loadUser();

  }, []);

  async function loadUser() {

    try {

      const attributes = await fetchUserAttributes();

      setUser({

        name:
          attributes.name ||
          attributes.email?.split("@")[0] ||
          "User",

        email:
          attributes.email || "",

        phone:
          attributes.phone_number || "Not provided",

        studentId:
          attributes.sub?.slice(0, 8) || "N/A",

        block: "Not set",

        room: "Not set",

        joinedDate: "—",

        totalRequests: 0,

        completedRequests: 0,

        activeRequests: 0

      });

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  /* =========================
     LOGOUT
  ========================= */

  async function handleLogout() {

    await signOut();

    window.location.href = "/login";

  }

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading profile...

      </div>

    );

  }

  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Failed to load profile

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* PROFILE CARD */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
          >

            <div className="bg-gradient-to-br from-[#BAF1D4] to-emerald-300 p-8 sm:p-12 text-[#064E3B] text-center relative overflow-hidden">

              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">

                <User className="w-12 h-12 text-[#059669]" />

              </div>

              <h2 className="text-3xl font-black tracking-tight mt-2">

                {user.name}

              </h2>

              <p className="text-[#064E3B]/80 font-bold mt-1">

                ID: {user.studentId}

              </p>

            </div>

            <div className="p-6 space-y-4">

              <DetailRow
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                value={user.email}
              />

              <DetailRow
                icon={<Phone className="w-5 h-5" />}
                label="Phone"
                value={user.phone}
              />

              <DetailRow
                icon={<Building className="w-5 h-5" />}
                label="Block"
                value={user.block}
              />

              <DetailRow
                icon={<MapPin className="w-5 h-5" />}
                label="Room"
                value={user.room}
              />

              <DetailRow
                icon={<Calendar className="w-5 h-5" />}
                label="Joined"
                value={user.joinedDate}
              />

            </div>

            <div className="p-8 sm:px-10 space-y-4">

              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#BAF1D4] hover:bg-emerald-300 text-[#064E3B] rounded-full font-bold transition shadow-sm hover:shadow-md hover:-translate-y-0.5">

                <Edit className="w-4 h-4" />

                Edit Profile

              </button>

              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-full font-bold transition">

                <Settings className="w-4 h-4" />

                Settings

              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full font-bold transition mt-2"
              >

                <LogOut className="w-4 h-4" />

                Log Out

              </button>

            </div>

          </motion.div>

          {/* RIGHT SIDE */}

          <div className="lg:col-span-2 space-y-6">

            {/* STATS */}

            <div className="grid md:grid-cols-3 gap-6">

              <StatCard
                icon={<Wrench />}
                label="Total Requests"
                value={user.totalRequests}
              />

              <StatCard
                icon={<CheckCircle />}
                label="Completed"
                value={user.completedRequests}
              />

              <StatCard
                icon={<Clock />}
                label="Active"
                value={user.activeRequests}
              />

            </div>

            {/* QUICK ACTIONS */}

            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">

              <h3 className="text-2xl font-black mb-6 tracking-tight text-slate-900 flex items-center gap-3">
                <div className="w-2 h-8 bg-emerald-400 rounded-full"></div>
                Quick Actions

              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <a
                  href="/Maintenance"
                  className="bg-emerald-50 text-[#059669] p-8 rounded-[24px] hover:bg-emerald-100 transition flex flex-col items-center justify-center gap-3 text-center font-bold border border-emerald-100"
                >
                  <Wrench className="w-8 h-8" />
                  New Maintenance Request
                </a>

                <a
                  href="/cleaning"
                  className="bg-teal-50 text-teal-700 p-8 rounded-[24px] hover:bg-teal-100 transition flex flex-col items-center justify-center gap-3 text-center font-bold border border-teal-100"
                >
                  <Sparkles className="w-8 h-8" />
                  Request Cleaning
                </a>

              </div>

            </div>

            {/* ACCOUNT STATUS */}

            <div className="bg-[#E5F7EB] border border-[#BAF1D4] p-8 rounded-[32px]">

              <div className="flex gap-4 items-center">

                <div className="p-3 bg-white rounded-full">
                  <Shield className="text-[#059669] w-8 h-8" />
                </div>

                <div>

                  <h4 className="font-black text-xl text-slate-900 tracking-tight">

                    Account Verified

                  </h4>

                  <p className="text-slate-500 font-medium">

                    Logged in securely

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

/* COMPONENTS */

function DetailRow({ icon, label, value }: any) {

  return (

    <div className="flex gap-3">

      {icon}

      <div>

        <div className="text-xs text-slate-500">

          {label}

        </div>

        <div className="font-semibold">

          {value}

        </div>

      </div>

    </div>

  );

}

function StatCard({ icon, label, value }: any) {

  return (

    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3">

      <div className="text-slate-400">
        {icon}
      </div>

      <div className="text-4xl font-black text-slate-900">

        {value}

      </div>

      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">

        {label}

      </div>

    </div>

  );

}