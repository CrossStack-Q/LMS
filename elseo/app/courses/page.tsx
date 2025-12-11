// import ActiveCourses from "../components/Courses/ActiveCourses";
// import CoursesFilters from "../components/Courses/CoursesFilters";
// import CoursesGrid from "../components/Courses/CoursesGrid";
// import Navbar from "../components/Navbar";

// export default function CoursesPage() {
//     return (
//         <main className="min-h-screen text-(--gray-900)">
//             {/* No Navbar here, you already render it globally */}
//             <Navbar />

//             <div className="border-x-2 border-(--gray-500) max-w-7xl mx-auto">

//                 {/* Active Courses section */}
//                 <ActiveCourses />

//                 <div className="col-span-4 row-span-2 px-6 pt-12 flex flex-col justify-end">
//                     <h2 className="text-4xl font-medium">Courses</h2>
//                 </div>

//                 {/* Filters */}
//                 <CoursesFilters />

//                 {/* Courses Grid */}
//                 <CoursesGrid />
//                 <div className="py-8">

//                 </div>
//             </div>
//         </main>
//     );
// }








"use client";

import Navbar from "../components/Navbar";
import ActiveCourses from "../components/Courses/ActiveCourses";
import CoursesFilters from "../components/Courses/CoursesFilters";
import CoursesGrid from "../components/Courses/CoursesGrid";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch Courses
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/courses")
      .then(res => res.json())
      .then(setCourses);
  }, []);

  // Fetch Categories
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  return (
    <main className="min-h-screen text-(--gray-900)">
      <Navbar />

      <div className="border-x-2 border-(--gray-500) max-w-7xl mx-auto">

        <ActiveCourses />

        <div className="px-6 pt-12">
          <h2 className="text-4xl font-medium">Courses</h2>
        </div>

        <CoursesFilters
          categories={categories}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CoursesGrid
          courses={courses}
          selectedLevel={selectedLevel}
          selectedCategory={selectedCategory}
        />

        <div className="py-10"></div>
      </div>
    </main>
  );
}
