"use client";

import { useAuth } from "../providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
  logout();
  router.push("/login");
};

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto border-x border-b border-(--gray-500) p-6 flex-1 w-full">
      <h1>User Profile</h1>
      <p className="text-2xl">Welcome {user.email}</p>
      <p className="text-2xl">Role: {user.role}</p>
      <span
      onClick={handleLogout}
      className="cursor-pointer text-red-400 hover:text-red-600 text-2xl font-semibold"
    >
      Logout
    </span>
    </div>
  );
}
