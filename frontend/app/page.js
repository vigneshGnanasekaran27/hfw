"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/me`, {
          credentials: "include",
        });
        if (res.ok) {
          router.push("/profile"); // ✅ authenticated
        } else {
          router.push("/login"); // ❌ not authenticated
        }
      } catch (err) {
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  return <p>Checking session...</p>;
}
