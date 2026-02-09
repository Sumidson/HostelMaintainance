import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight text-slate-900">HostelDesk</div>
            <div className="text-[10px] text-slate-600 -mt-1">Bennett University</div>
          </div>
        </Link>

        {/* Middle: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/Maintenance" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
          Maintenance
          </Link>
          <Link href="/cleaning" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Cleaning
          </Link>
          <Link href="/Status" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Status
          </Link>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/auth/staff" className="text-sm font-medium text-amber-600 hover:text-amber-700 transition">
            Staff Login
          </Link>
          <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Login
          </Link>
          <Link href="/auth/signup">
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-sm">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}