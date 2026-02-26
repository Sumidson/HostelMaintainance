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
            className="bg-white rounded-3xl border shadow-lg overflow-hidden"
          >

            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 text-white text-center">

              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">

                <User className="w-12 h-12 text-indigo-600" />

              </div>

              <h2 className="text-2xl font-bold">

                {user.name}

              </h2>

              <p className="text-indigo-100 text-sm">

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

            <div className="p-6 space-y-3">

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl">

                <Edit className="w-4 h-4" />

                Edit Profile

              </button>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 rounded-xl">

                <Settings className="w-4 h-4" />

                Settings

              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl"
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

            <div className="bg-white p-6 rounded-xl border">

              <h3 className="text-xl font-bold mb-4">

                Quick Actions

              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <a
                  href="/maintenance"
                  className="bg-slate-900 text-white p-6 rounded-xl"
                >
                  <Wrench />
                  New Maintenance Request
                </a>

                <a
                  href="/cleaning"
                  className="bg-emerald-500 text-white p-6 rounded-xl"
                >
                  <Sparkles />
                  Request Cleaning
                </a>

              </div>

            </div>

            {/* ACCOUNT STATUS */}

            <div className="bg-indigo-50 border p-6 rounded-xl">

              <div className="flex gap-3">

                <Shield className="text-indigo-600" />

                <div>

                  <h4 className="font-bold">

                    Account Verified

                  </h4>

                  <p className="text-sm text-slate-600">

                    Logged in using Cognito

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

    <div className="bg-white p-6 rounded-xl border">

      {icon}

      <div className="text-3xl font-bold">

        {value}

      </div>

      <div className="text-sm text-slate-600">

        {label}

      </div>

    </div>

  );

}