"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/me`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 401) {
          // Try refreshing the token
          const refreshRes = await fetch(`${API_BASE}/api/v1/refresh`, {
            method: "POST",
            credentials: "include",
          });
          if (refreshRes.ok) {
            // Retry the original request
            const retryRes = await fetch(`${API_BASE}/api/v1/me`, {
              credentials: "include",
            });
            if (retryRes.ok) {
              const data = await retryRes.json();
              setUser(data.user);
            } else {
              router.push("/login");
            }
          } else {
            router.push("/login");
          }
        } else if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome {user.email}</h1>
    </div>
  );
}
