"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers";
import Hero from "../components/Hero";
import Login from "../components/Login/Login";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth(); // ✅ single hook call

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ If already logged in, redirect away from login page
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.user, data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Optional loading guard
  if (user) return null;

  return (
    <div className="max-w-7xl border-x border-b border-(--gray-500) mx-auto bg-grid flex-1 w-full">
      <div className=" mx-auto px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* left */}
          <div className="md:col-span-6 col-span-12">
            <p className="text-2xl md:text-4xl font-semibold leading-[1.05] py-8">
              Login
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="font-medium text-(--gray-700)"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border text-lg border-(--gray-300) px-4 py-2 focus:outline-none bg-(--bg-light)"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="font-medium text-(--gray-700)"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border text-lg border-(--gray-300) px-4 py-2 focus:outline-none bg-(--bg-light)"
                />
              </div>

              <button
                disabled={loading}
                className="bg-black px-4 py-2 text-white w-fit rounded-md disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login / Register"}
              </button>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          </div>
          <div className="md:col-span-6 hidden md:flex justify-end">
            <div className="w-96 h-64 md:w-80 md:h-80 bg-white border border-subtle rounded-md flex items-center justify-center shadow-sm">
              <div className="text-center">
                <div className="text-6xl">🤖</div> 
                <div className="text-3xl font-bold text-(--primary-green)">Login</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
