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
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
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
