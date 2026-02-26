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
    <nav className="border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition z-50 relative">
          <div className="text-emerald-300">
            {/* Custom SVG logo based on ProSiteX reference (a clustered dot/star shape) */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12.5523 2 13 2.44772 13 3V7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7V3C11 2.44772 11.4477 2 12 2Z" />
              <path d="M12 16C12.5523 16 13 16.4477 13 17V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V17C11 16.4477 11.4477 16 12 16Z" />
              <path d="M22 12C22 11.4477 21.5523 11 21 11H17C16.4477 11 16 11.4477 16 12C16 12.5523 16.4477 13 17 13H21C21.5523 13 22 12.5523 22 12Z" />
              <path d="M8 12C8 11.4477 7.55228 11 7 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H7C7.55228 13 8 12.5523 8 12Z" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="16.5" cy="7.5" r="2.5" />
              <circle cx="7.5" cy="16.5" r="2.5" />
              <circle cx="16.5" cy="16.5" r="2.5" />
              <circle cx="7.5" cy="7.5" r="2.5" />
            </svg>
          </div>
          <div className="font-bold text-xl tracking-tight text-slate-900">
            HostelDesk
          </div>
        </Link>

        {/* Desktop Navigation Links (Pill layout) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-50 border border-slate-100 p-1.5 rounded-full">
          <Link href="/Maintenance" className="text-sm font-medium px-4 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">
            Maintenance
          </Link>
          <Link href="/cleaning" className="text-sm font-medium px-4 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">
            Cleaning
          </Link>
          <Link href="/Status" className="text-sm font-medium px-4 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">
            Status
          </Link>
        </div>

        {/* Right Section (Always visible auth buttons) */}
        <div className="flex items-center gap-3 z-50 relative">
          {!isLoggedIn ? (
            <>
              <Link href="/auth/staff" className="hidden lg:block text-xs font-medium text-slate-500 hover:text-slate-800 transition mr-2">
                Staff
              </Link>
              <Link href="/auth/signup" className="hidden md:block">
                <button className="text-slate-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-50 transition">
                  Sign up
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="bg-emerald-200 text-emerald-950 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-300 transition shadow-sm">
                  Log in
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
                className="hidden md:block bg-red-50 text-red-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-100 transition border border-red-100"
              >
                Log out
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
