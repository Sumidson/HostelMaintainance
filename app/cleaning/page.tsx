"use client";

import { useState } from "react";
import { Sparkles, Send, AlertCircle } from "lucide-react";
import Navbar from "../navbar";
import { createComplaint } from "../lib/api";

export default function Cleaning() {

  const [block, setBlock] = useState("");
  const [room, setRoom] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const blocks = [
    "N Block", "P Block", "K Block", "C1 Block", "C2 Block", "C3 Block",
    "C4 Block", "C5 Block", "C6 Block", "C7 Block", "C8 Block", "C9 Block",
    "C10 Block", "C11 Block", "D1 Block", "D2 Block", "D3 Block", "D4 Block",
    "D5 Block", "D6 Block", "D7 Block", "A Block", "B Block"
  ];

  const cleaningTypes = [
    "Room Clean",
    "Washroom Clean",
    "Floor Clean",
    "Common Area Clean",
    "Other"
  ];

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setError("");

    if (!block || !room || !type) {
      setError("Please fill all required fields");
      return;
    }

    try {

      setLoading(true);

      const complaintData = {

        title: `Cleaning - ${type}`,

        description:
          `Block: ${block}
Room: ${room}
Type: ${type}
Details: ${desc || "None"}`,

        status: "OPEN"
      };

      console.log("Submitting cleaning request:", complaintData);

      const result = await createComplaint(complaintData);

      console.log("Success:", result);

      alert("Cleaning request submitted successfully");

      // reset form
      setBlock("");
      setRoom("");
      setType("");
      setDesc("");

    } catch (err: any) {

      console.error("Cleaning submit error:", err);

      setError(
        err?.message || "Failed to submit cleaning request"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-emerald-50">

      <Navbar />

      <div className="max-w-3xl mx-auto p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Cleaning Request
          </h1>

          <p className="text-slate-600">
            Submit a cleaning request for your room or area
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border">

          {/* Block */}
          <select
            value={block}
            onChange={e => setBlock(e.target.value)}
            required
            className="w-full border p-3 rounded-xl text-slate-900 bg-white"
          >
            <option value="">Select Block</option>
            {blocks.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {/* Room */}
          <input
            value={room}
            onChange={e => setRoom(e.target.value)}
            placeholder="Room Number"
            required
            className="w-full border p-3 rounded-xl text-slate-900 bg-white"
          />

          {/* Type */}
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            required
            className="w-full border p-3 rounded-xl text-slate-900 bg-white"
          >
            <option value="">Select Cleaning Type</option>
            {cleaningTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Description */}
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Additional details (optional)"
            className="w-full border p-3 rounded-xl text-slate-900 bg-white"
          />

          {/* Error */}
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
            className="w-full bg-emerald-500 text-white py-4 rounded-xl flex justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
            <Send />
          </button>

        </form>

      </div>

    </div>
  );
}