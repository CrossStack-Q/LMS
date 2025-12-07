"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/home" },
    { name: "Courses", path: "/dashboard/courses" },
    { name: "Teachers", path: "/dashboard/teachers" },
    { name: "Messages", path: "/dashboard/chat" },
    { name: "Analytics", path: "/dashboard/analytics" },
    { name: "Payments", path: "/dashboard/payments" },
  ];

  return (
    <div className="bg-zinc-800 text-white flex flex-col p-2 h-full rounded-lg">

      <h1 className="text-2xl font-bold mb-8">SkillZone</h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item, i) => {
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");

          return (
            <Link
              key={i}
              href={item.path}
              className={`p-2 rounded-lg transition ${
                isActive ? "bg-zinc-700" : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-sm pt-8 border-t border-gray-700">
        <p>Support</p>
        <p>Settings</p>
      </div>
    </div>
  );
}

