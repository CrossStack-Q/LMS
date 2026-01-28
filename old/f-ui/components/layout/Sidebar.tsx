// "use client"

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard/home" },
//     { name: "Courses", path: "/dashboard/courses" },
//     { name: "Teachers", path: "/dashboard/teachers" },
//     { name: "Messages", path: "/dashboard/chat" },
//     { name: "Analytics", path: "/dashboard/analytics" },
//     { name: "Payments", path: "/dashboard/payments" },
//   ];

//   return (
//     <div className="bg-zinc-800 text-white flex flex-col p-2 h-full rounded-lg">

//       <h1 className="text-2xl font-bold mb-8">SkillZone</h1>

//       <nav className="flex flex-col gap-2">
//         {menuItems.map((item, i) => {
//           const isActive =
//             pathname === item.path || pathname.startsWith(item.path + "/");

//           return (
//             <Link
//               key={i}
//               href={item.path}
//               className={`p-2 rounded-lg transition ${
//                 isActive ? "bg-zinc-700" : "hover:bg-gray-800"
//               }`}
//             >
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="mt-auto text-sm pt-8 border-t border-gray-700">
//         <p>Login</p>
//       </div>
//     </div>
//   );
// }



"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token validity
  const checkToken = () => {
    const token = localStorage.getItem("token");

    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expired = payload.exp * 1000 < Date.now();

      if (expired) return false;

      return true;
    } catch {
      return false;
    }
  };

  // On load set authentication state
  useEffect(() => {
    setIsAuthenticated(checkToken());
  }, []);

  // --- Button Handlers ---

  const handleLogin = () => {
    if (checkToken()) {
      router.push("/account");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.push("/auth");
    }
  };

  const handleAccount = () => {
    if (checkToken()) {
      router.push("/account");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.push("/auth");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  // Menu items
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

      {/* Bottom Buttons */}
      <div className="mt-auto text-sm pt-8 border-t border-gray-700 flex flex-col gap-2">

        {!isAuthenticated && (
          <button onClick={handleLogin} className="text-left hover:underline">
            Login
          </button>
        )}

        {isAuthenticated && (
          <>
            <button
              onClick={handleAccount}
              className="text-left hover:underline"
            >
              Account
            </button>

            <button
              onClick={handleLogout}
              className="text-left hover:underline text-red-400"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
