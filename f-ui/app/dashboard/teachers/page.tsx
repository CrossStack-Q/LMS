"use client"

import HomeTopBar from "@/components/topBar/HomeTopBar";
import HomeTopBar2 from "@/components/topBar/HomeTopBar2";
import TeacherCard from "@/components/teachers/TeacherCard";
import "@/app/globals.css"
import { useEffect, useMemo, useState } from "react";
import { Teacher } from "@/types/teacher";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function loadTeachers() {
        try {
          const res = await fetch("http://localhost:8080/api/v1/teachers");
          const data = await res.json();
          setTeachers(data);
        } catch (err) {
          console.error("Failed to fetch courses:", err);
        } finally {
          setLoading(false);
        }
      }
      loadTeachers();
    }, []);
  
  
    if (loading) {
      return (
        <div className="p-10 text-center text-xl font-medium">
          ⏳ Loading courses...
        </div>
      );
    }
  return (
    <div className="h-full overflow-y-auto hidescroll">
      
      <div className="sticky top-0 bg-gray-50 z-50 pb-1">
        <HomeTopBar />
      </div>

      <div className="sticky top-[60px] bg-gray-50 z-40 pb-2">
        <HomeTopBar2 />
      </div>

      <div className="mt-4 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">HTML Teachers</h2>
          <div className="flex gap-6 overflow-x-auto hidescroll py-2">
            {teachers.map((t, index) => (
              <TeacherCard key={index} {...t} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">CSS Teachers</h2>
          <div className="rounded-xl overflow-x-auto scroll-smooth max-w-full hidescroll">
            <div className="flex gap-6 flex-nowrap min-w-max py-2">
              {teachers.map((t, index) => (
                <TeacherCard key={index} {...t} />
              ))}
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
