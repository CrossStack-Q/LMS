import Link from "next/link";
import { courses } from "@/lib/coursesS";
import CoursesPageOO from "@/components/courses/dummy/dummyCourse";

export default function CoursesPage() {
  return (
    <div className="px-6">
      {/* <h1 className="text-2xl font-semibold mb-4">Courses</h1> */}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/dashboard/courses/${course.id}`}
            className="p-4 bg-white shadow rounded-xl hover:shadow-lg transition"
          >
            <h2 className="font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {course.description}
            </p>
          </Link>
        ))}
      </div> */}
      <CoursesPageOO/>
    </div>
  );
}
