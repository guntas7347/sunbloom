"use client";

import Link from "next/link";
import { loginWithGoogleRestricted } from "@/lib/firebase/auth";

export default function AdminAuthPage() {
  const handleLogin = async () => {
    try {
      await loginWithGoogleRestricted();
      window.location.href = "/admin";
    } catch {
      alert("Unauthorized account");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">Admin Login</h1>

      <button
        onClick={handleLogin}
        className="rounded-md px-4 py-2 font-medium shadow hover:bg-blue-300"
      >
        Login with Google
      </button>

      <Link href="/" className="text-sm underline">
        Go to Home
      </Link>
    </div>
  );
}
