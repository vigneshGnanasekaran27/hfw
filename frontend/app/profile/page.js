"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const csrfToken = localStorage.getItem("csrf_token");

      const res = await fetch(`${API_BASE}/api/v1/me`, {
        credentials: "include",
        headers: {
          "X-CSRF-Token": csrfToken ?? "",
        },
      });

      if (res.status === 401) {
        // Try refreshing
        const refreshRes = await fetch(`${API_BASE}/api/v1/refresh`, {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CSRF-Token": csrfToken ?? "",
          },
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem("csrf_token", data.csrf);
          fetchProfile(); // retry
        } else {
          router.push("/login");
        }
      } else if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/login");
      }
    };

    fetchProfile();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
    </div>
  );
}
