"use client";

import { auth } from "@/lib/firebase/firebase";
import { logout } from "@/lib/firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  User2,
  LogOut,
  FileText,
  Quote,
  Layers,
  CreditCard,
  Puzzle,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

// Configuration for links
const navLinks = [
  { name: "Blog", href: "/admin/blog", icon: FileText },
  // { name: "Quotes", href: "/admin/quotes", icon: Quote },
  { name: "Services", href: "/admin/services", icon: Layers },
  // { name: "Pricing", href: "/admin/pricing", icon: CreditCard },
  // { name: "Addons", href: "/admin/addons", icon: Puzzle },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
];

export default function AdminNavbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    const ask = confirm("Logout?");
    if (!ask) return;
    await logout();
    window.location.href = "/admin/auth";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* --- Left Side: Logo & Desktop Nav --- */}
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-bold text-lg text-slate-800 tracking-tight">
                Sunbloom Img. <span className="text-indigo-600">CMS</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname?.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }
                    `}
                  >
                    <Icon
                      size={16}
                      className={
                        isActive ? "text-indigo-600" : "text-slate-400"
                      }
                    />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* --- Right Side: User & Actions --- */}
          <div className="flex items-center gap-4">
            {/* User Profile (Desktop) */}
            {user && (
              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <div className="bg-indigo-100 p-1 rounded-full">
                  <User2 size={16} className="text-indigo-600" />
                </div>
                <span className="text-xs font-medium text-slate-700 max-w-[150px] truncate">
                  {user.email}
                </span>
              </div>
            )}

            {/* Logout Button (Desktop) */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex group items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
              title="Sign out"
            >
              <LogOut
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg z-40 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-4">
            {/* Mobile Links */}
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)} // Close menu on click
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }
                    `}
                  >
                    <Icon size={18} />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <hr className="border-slate-100" />

            {/* Mobile User Info & Logout */}
            <div className="flex items-center justify-between">
              {user && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User2 size={16} />
                  <span className="truncate max-w-[200px]">{user.email}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
