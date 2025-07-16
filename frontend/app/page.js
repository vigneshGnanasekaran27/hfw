"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/me", {
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
