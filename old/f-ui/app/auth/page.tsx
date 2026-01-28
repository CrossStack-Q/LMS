"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  

  const isTokenExpired = (token:string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      // exp is in SECONDS (Go jwt.RegisteredClaims)
      const expMs = payload.exp * 1000;

      return Date.now() > expMs;
    } catch (err) {
      // invalid token → treat as expired
      return true;
    }
  };

  const handleLogin = async () => {
    
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error != undefined) {
        setError(data.error);   // show red text under password
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userID",data.user.id)

      // redirect logic
      if (!data.user.name || data.user.name.trim() === "") {
        router.push("/name");
      } else {
        router.push("/dashboard/home");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token")
      localStorage.removeItem("userID")
      setLoading(false);   // no redirect → show login page
      return;
    }

    router.push("/dashboard/home"); // valid token → go home
  }, []);

  if (loading) return <p>Loading...</p>;



  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex flex-col h-full flex-[0.5] justify-center items-center gap-6">
        <p className="text-3xl text-center">Entrance</p>
        <input value={email}
          onChange={(e) => setEmail(e.target.value)} className="max-w-md px-4 py-2 text-lg rounded-xl w-full bg-white" type="email" name="email" id="email" placeholder="Enter Email" />
        <input value={password}
          onChange={(e) => setPassword(e.target.value)} className="max-w-md px-4 py-2 text-lg rounded-xl w-full bg-white" type="password" name="password" id="password" placeholder="Enter Password" />
        {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}
        <button onClick={handleLogin} className="bg-zinc-500 text-zinc-50 px-4 py-2 rounded-xl">Enter</button>
      </div>
      <div className="flex-[0.5] relative w-full">
        <Image
          src="/LoginTryo.webp"
          fill
          objectFit="cover"
          alt="Example"
        />
      </div>
    </div>
  );
}
