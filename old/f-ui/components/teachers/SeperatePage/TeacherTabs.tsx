"use client";

import { useState } from "react";

const tabs = ["About me", "Schedule", "Courses", "Resume", "Reviews"];

export default function TeacherTabs({ activeTab, setActiveTab }: any) {
  return (
    <div className="grid grid-rows-1 grid-cols-5 mt-6 bg-zinc-200 rounded-md p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={` px-4 py-2  rounded-md ${
            activeTab === tab
              ? "font-semibold bg-white"
              : "text-zinc-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
