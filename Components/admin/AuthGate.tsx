"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ALLOWED_EMAILS } from "@/lib/firebase/auth";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<null | boolean>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user || !user.email || !ALLOWED_EMAILS.includes(user.email)) {
        setAllowed(false);
        router.replace("/admin/auth");
      } else {
        setAllowed(true);
      }
    });

    return () => unsub();
  }, [router]);

  if (allowed !== true) return null;

  return <>{children}</>;
}
