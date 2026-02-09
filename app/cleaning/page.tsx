
"use client";

import { useState } from "react";
import { Sparkles, Send, AlertCircle } from "lucide-react";
import Navbar from "../navbar";

export default function Cleaning() {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedCleaningType, setSelectedCleaningType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState("");

  // Block options
  const blocks = [
    "N Block",
    "P Block",
    "K Block",
    "C1 Block",
    "C2 Block",
    "C3 Block",
    "C4 Block",
    "C5 Block",
    "C6 Block",
    "C7 Block",
    "C8 Block",
    "C9 Block",
    "C10 Block",
    "C11 Block",
    "D1 Block",
    "D2 Block",
    "D3 Block",
    "D4 Block",
    "D5 Block",
    "D6 Block",
    "D7 Block",
    "A Block",
    "B Block"
  ];

  // Cleaning type options
  const cleaningTypes = [
    "Washroom Clean",
    "Room Clean",
    "Floor Clean",
    "Classroom Clean",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      block: selectedBlock,
      room: roomNumber,
      cleaningType: selectedCleaningType,
      description
    });
    // Add your form submission logic here
    alert("Cleaning request submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Request Cleaning Service
          </h1>
          <p className="text-slate-600">
            Schedule a cleaning service for your hostel room or common areas
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Block Selection */}
            <div>
              <label htmlFor="block" className="block text-sm font-semibold text-slate-900 mb-2">
                Select Block <span className="text-emerald-500">*</span>
              </label>
              <select
                id="block"
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:outline-none transition text-slate-900 bg-white"
              >
                <option value="">Choose your block</option>
                {blocks.map((block) => (
                  <option key={block} value={block}>
                    {block}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Number */}
            <div>
              <label htmlFor="room" className="block text-sm font-semibold text-slate-900 mb-2">
                Room Number <span className="text-emerald-500">*</span>
              </label>
              <input
                type="text"
                id="room"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g., 204"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:outline-none transition text-slate-900"
              />
            </div>

            {/* Cleaning Type */}
            <div>
              <label htmlFor="cleaningType" className="block text-sm font-semibold text-slate-900 mb-2">
                Cleaning Type <span className="text-emerald-500">*</span>
              </label>
              <select
                id="cleaningType"
                value={selectedCleaningType}
                onChange={(e) => setSelectedCleaningType(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:outline-none transition text-slate-900 bg-white"
              >
                <option value="">Select cleaning type</option>
                {cleaningTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
                Additional Details <span className="text-slate-400">(Optional)</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Any specific areas or instructions for cleaning..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:outline-none transition text-slate-900 resize-none"
              />
            </div>

            {/* Info Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-900">
                <p className="font-semibold mb-1">Eco-Friendly Cleaning</p>
                <p className="text-emerald-700">
                  We use environmentally safe cleaning products. Your cleaning request will be scheduled within 24 hours. You'll receive notifications about the cleaning status.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-600 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
            >
              Submit Request
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Need urgent cleaning? Call the housekeeping team at <span className="font-semibold text-emerald-600">+91-XXXXXXXXXX</span>
        </p>
      </div>
    </div>
  );
}