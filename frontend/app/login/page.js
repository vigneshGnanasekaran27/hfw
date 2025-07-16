"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiBase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}/api/v1/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("csrf_token", data.csrf); // Store CSRF token
      router.push("/profile");
    } else {
      const data = await res.json();
      setError(data?.error || "Login failed");
    }
  };

  const refresh = async () => {
    const csrfToken = localStorage.getItem("csrf_token");
    const res = await fetch(`${API_BASE}/api/v1/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "X-CSRF-Token": csrfToken },
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("csrf_token", data.csrf); // Update CSRF token
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
