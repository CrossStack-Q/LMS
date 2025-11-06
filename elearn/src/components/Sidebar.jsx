import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Teachers", path: "/teachers" },
    { name: "Messages", path: "/messages" },
    { name: "Analytics", path: "/analytics" },
    { name: "Payments", path: "/payments" },
  ];

  return (
    <div className="bg-zinc-800 text-white flex flex-col p-4 h-full rounded-3xl">
      <h1 className="text-2xl font-bold mb-8">SkillZone</h1>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `p-2 rounded-lg transition ${
                isActive ? "bg-zinc-700" : "hover:bg-gray-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto text-sm pt-8 border-t border-gray-700">
        <p>Support</p>
        <p>Settings</p>
      </div>
    </div>
  );
};

export default Sidebar;
