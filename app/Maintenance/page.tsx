"use client";

import { useState } from "react";
import { Wrench, Send, AlertCircle } from "lucide-react";
import Navbar from "../navbar";
import { createComplaint } from "../lib/api";

export default function Maintenance() {

  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const blocks = [
    "N Block", "P Block", "K Block", "C1 Block", "C2 Block", "C3 Block",
    "C4 Block", "C5 Block", "C6 Block", "C7 Block", "C8 Block", "C9 Block",
    "C10 Block", "C11 Block", "D1 Block", "D2 Block", "D3 Block", "D4 Block",
    "D5 Block", "D6 Block", "D7 Block", "A Block", "B Block"
  ];

  const issues = [
    "Furniture Repair and Change", "Water Dispenser Issue", "Lift", "WiFi",
    "Light", "Fan", "Ac", "Bed", "Table", "Cupboard", "Chair",
    "Electricity", "Door", "Door handle", "Window", "Plug", "Switch", "Other Issue"
  ];

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setError("");

    if (!selectedBlock || !selectedIssue || !roomNumber || !phoneNumber) {
      setError("Please fill all required fields");
      return;
    }

    try {

      setLoading(true);

      const complaintData = {

        title: selectedIssue,

        description:
          `Block: ${selectedBlock}
Room: ${roomNumber}
Phone: ${phoneNumber}
Details: ${description || "None"}`,

        status: "OPEN"
      };

      console.log("Submitting complaint:", complaintData);

      const result = await createComplaint(complaintData);

      console.log("Success:", result);

      alert("Complaint submitted successfully!");

      // Reset form
      setSelectedBlock("");
      setRoomNumber("");
      setPhoneNumber("");
      setSelectedIssue("");
      setDescription("");

    } catch (err: any) {

      console.error("Submit error:", err);

      setError(
        err?.message || "Failed to submit complaint. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">

        <div className="text-center mb-12">

          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E5F7EB] rounded-full mb-6 border border-[#BAF1D4]">
            <Wrench className="w-10 h-10 text-[#059669]" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Repair Request
          </h1>

          <p className="text-slate-500 font-medium text-lg">
            Report your hostel maintenance issue
          </p>

        </div>

        <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/40 border border-slate-100/60 p-8 sm:p-12">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Block */}
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 bg-slate-50"
            >
              <option value="">Select Block</option>
              {blocks.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Room */}
            <input
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Room Number"
              required
              className="w-full px-5 py-4 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 bg-slate-50"
            />

            {/* Phone */}
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              required
              className="w-full px-5 py-4 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 bg-slate-50"
            />

            {/* Issue */}
            <select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 bg-slate-50"
            >
              <option value="">Select Issue</option>
              {issues.map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>

            {/* Description */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional details (optional)"
              className="w-full px-5 py-4 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition text-slate-900 bg-slate-50"
            />

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#BAF1D4] hover:bg-emerald-300 text-[#064E3B] py-4 rounded-full font-bold text-lg transition shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
              <Send className="w-5 h-5" />
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}