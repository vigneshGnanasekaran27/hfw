"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const csrfToken = localStorage.getItem("csrf_token");

      const res = await fetch(`${API_BASE}/api/v1/me`, {
        credentials: "include",
        headers: {
          "X-CSRF-Token": csrfToken ?? "",
        },
      });

      if (res.ok) {
        router.push("/profile");
      } else {
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  return <p>Checking session...</p>;
}
