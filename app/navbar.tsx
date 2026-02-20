"use client";

import Link from "next/link";
import { Wrench, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const session = await fetchAuthSession();
        const userRole =
          session.tokens?.idToken?.payload["custom:role"] as string;

        if (session.tokens) {
          setIsLoggedIn(true);
          setRole(userRole);
        }
      } catch {
        setIsLoggedIn(false);
        setRole(null);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setRole(null);
    router.push("/");
  };

  return (
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition z-50 relative">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight text-slate-900">
              HostelDesk
            </div>
            <div className="text-[10px] text-slate-600 -mt-1">
              Bennett University
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Right Section (Always visible auth buttons) */}
        <div className="flex items-center gap-3 sm:gap-4 z-50 relative">
          {!isLoggedIn ? (
            <>
              <Link href="/auth/staff" className="text-xs sm:text-sm font-medium text-amber-600 hover:text-amber-700 transition">
                Staff Sign In
              </Link>
              <Link href="/auth/login" className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                Sign In
              </Link>
              <Link href="/auth/signup" className="hidden md:block">
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-sm">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white absolute top-full left-0 right-0 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
            <Link
              href="/Maintenance"
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Maintenance
            </Link>
            <Link
              href="/cleaning"
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Cleaning
            </Link>
            <Link
              href="/Status"
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Status
            </Link>

            {/* Auth actions in mobile menu */}
            {!isLoggedIn ? (
              <Link href="/auth/signup" className="block px-3 py-3 mt-2" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-slate-900 text-white px-5 py-3 rounded-lg text-base font-medium hover:bg-slate-800 transition shadow-sm">
                  Sign Up
                </button>
              </Link>
            ) : (
              <>
                <div className="border-t border-slate-100 my-2"></div>
                <Link
                  href="/profile"
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-2 text-left px-3 py-3 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
