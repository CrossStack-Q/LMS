"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Course } from "@/types/course";
import CourseCard from "./CourseCard";
import CategoryPill from "./CategoryPill";

// Corrected JSON for categories


function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-5xl font-medium leading-tight">{title}</h1>
      {subtitle && <p className="text-lg text-muted-foreground mt-3">{subtitle}</p>}
    </div>
  );
}

// function CategoryPill({
//   label,
//   count,
//   active,
//   onClick,
// }: {
//   label: string;
//   count?: number;
//   active?: boolean;
//   onClick?: () => void;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-sm ${active
//           ? "bg-white ring-2 ring-indigo-400"
//           : "bg-white/90 border border-gray-100"
//         }`}>
//       <span>{label}</span>
//       {typeof count === "number" && (
//         <span className="ml-1 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs bg-gray-100">
//           {count}
//         </span>
//       )}
//     </button>
//   );
// }

function CategoryFilter({
  categories,
  active,
  setActive,
}: {
  categories: { label: string; count: number }[];
  active: string;
  setActive: (c: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((c) => (
        <CategoryPill
          key={c.label}
          label={c.label}
          count={c.count}
          active={active === c.label}
          onClick={() => setActive(c.label)}
        />
      ))}
    </div>
  );
}

function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {courses.map((c) => (
        <CourseCard key={c.id} {...c} />
      ))}
    </div>
  );
}

// -------------------- Page --------------------

export default function CoursesPageOO() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<string>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch("http://localhost:8080/api/v1/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    }
    async function loadCategories() {
      try {
        const res = await fetch("http://localhost:8080/api/v1/categories")
        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadCategories()
    loadCourses();
  }, []);

  const filtered = useMemo(() => {
    let items = [...courses];

    // Category filter
    if (activeCat !== "All") {
      items = items.filter(
        (c) => c.category_name === activeCat || c.category_name.includes(activeCat)
      );
    }

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.short_desc.toLowerCase().includes(q)
      );
    }

    return items;
  }, [courses, activeCat, query]);

  if (loading) {
    return (
      <div className="p-10 text-center text-xl font-medium">
        ⏳ Loading courses...
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="sticky top-0 z-50 bg-gray-50">
  <SectionHeader
    title="What do you want to learn today?"
    subtitle="Select a course that fits your interests and experience level"
  />

  {/* Filters */}
  <div className="mb-4 flex flex-col gap-4">
    <div className="hidden md:flex gap-3">
      {/* Add "All courses" as first pill */}
      <CategoryPill
        label="All"
        active={activeCat === "All"}
        onClick={() => setActiveCat("All")}
      />
      {categories.map((c) => (
        <CategoryPill
          key={c.id}
          label={c.name}
          count={c.course_count}
          active={activeCat === c.name}
          onClick={() => setActiveCat(c.name)}
        />
      ))}
    </div>

    <div className="flex md:hidden gap-3 overflow-x-auto">
      <CategoryPill
        label="All"
        active={activeCat === "All"}
        onClick={() => setActiveCat("All")}
      />
      {categories.slice(0, 5).map((c) => (
        <CategoryPill
          key={c.id}
          label={c.name}
          count={c.course_count}
          active={activeCat === c.name}
          onClick={() => setActiveCat(c.name)}
        />
      ))}
    </div>

    {/* Search + top pills */}
    <div className="mt-3 flex items-center justify-between gap-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses"
        className="px-4 py-2 bg-white rounded-lg shadow-sm border w-64"
      />
    </div>
  </div>
</div>


      {/* Course Grid */}
      <div className="pb-8">
        <CourseGrid courses={filtered} />
      </div>
    </div>
  );
}
