"use client";

import { useState } from "react";
import { Wrench, Send, AlertCircle } from "lucide-react";
import Navbar from "../navbar";

export default function Maintenance() {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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

  // Issue options
  const issues = [
    "Furniture Repair and Change",
    "Water Dispenser Issue",
    "Lift",
    "WiFi",
    "Light",
    "Fan",
    "Ac",
    "Bed",
    "Table",
    "Cupboard",
    "Chair",
    "Electricity",
    "Door",
    "Door handle",
    "Window",
    "Plug",
    "Switch",   
    "Other Issue" 
    

  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      block: selectedBlock,
      room: roomNumber,
      phone: phoneNumber,
      issue: selectedIssue,
      description
    });
    // Add your form submission logic here
    alert("Complaint submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-4">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Register Maintenance Complaint
          </h1>
          <p className="text-slate-600">
            Report your hostel maintenance issue and we'll get it resolved quickly
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Block Selection */}
            <div>
              <label htmlFor="block" className="block text-sm font-semibold text-slate-900 mb-2">
                Select Block <span className="text-red-500">*</span>
              </label>
              <select
                id="block"
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900 bg-white"
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
                Room Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="room"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g., 204"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
              />
            </div>

            {/* Contact: Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., 9876543210"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900"
              />
            </div>

            {/* Issue Type */}
            <div>
              <label htmlFor="issue" className="block text-sm font-semibold text-slate-900 mb-2">
                Issue Type <span className="text-red-500">*</span>
              </label>
              <select
                id="issue"
                value={selectedIssue}
                onChange={(e) => setSelectedIssue(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900 bg-white"
              >
                <option value="">Select issue type</option>
                {issues.map((issue) => (
                  <option key={issue} value={issue}>
                    {issue}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
                Description <span className="text-slate-400">(Optional)</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide additional details about the issue..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition text-slate-900 resize-none"
              />
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Quick Response Guaranteed</p>
                <p className="text-blue-700">
                  Your complaint will be assigned to our maintenance team within 2 minutes. You'll receive real-time updates via notifications.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
            >
              Submit Complaint
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Need urgent assistance? Call the hostel office at <span className="font-semibold text-slate-900">+91-XXXXXXXXXX</span>
        </p>
      </div>
    </div>
  );
}