// "use client";

// import Navbar from "../components/Navbar";
// import ActiveCourses from "../components/Courses/ActiveCourses";
// import CoursesFilters from "../components/Courses/CoursesFilters";
// import CoursesGrid from "../components/Courses/CoursesGrid";
// import { useEffect, useState } from "react";
// import Footer from "../components/Footer";

// export default function CoursesPage() {
//   const [courses, setCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState("All");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   // Fetch Courses
//   useEffect(() => {
//     fetch("http://localhost:8080/api/v1/courses")
//       .then(res => res.json())
//       .then(setCourses);
//   }, []);

//   // Fetch Categories
//   useEffect(() => {
//     fetch("http://localhost:8080/api/v1/categories")
//       .then(res => res.json())
//       .then(setCategories);
//   }, []);

//   return (
//     <main className="text-(--gray-900)">

//       <div className="border-x border-b border-(--gray-500) max-w-7xl mx-auto">

//         {/* <ActiveCourses /> */}

//         <div className="px-6 pt-12">
//           <h2 className="text-4xl font-medium">Courses</h2>
//         </div>

//         <CoursesFilters
//           categories={categories}
//           selectedLevel={selectedLevel}
//           setSelectedLevel={setSelectedLevel}
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />

//         <CoursesGrid
//           courses={courses}
//           selectedLevel={selectedLevel}
//           selectedCategory={selectedCategory}
//         />
//         <div className="py-10"></div>
//       </div>
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import CoursesFilters from "../components/Courses/CoursesFilters";
import CoursesGrid from "../components/Courses/CoursesGrid";

export type Course = {
  id: number;
  title: string;
  teacher_name: string;
  level: string;
  category_name: string;
  short_desc: string;
  cover_image: string;
  is_free: boolean;
};

export type Category = {
  id: number;
  name: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/courses")
      .then(res => res.json())
      .then(setCourses);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  return (
    <main className="text-(--gray-900)">
      <div className="max-w-7xl mx-auto border-x border-b border-(--gray-500)">

        <div className="px-4 sm:px-6 pt-10 sm:pt-12">
          <h2 className="text-3xl sm:text-4xl font-medium">Courses</h2>
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

        <div className="py-10" />
      </div>
    </main>
  );
}
