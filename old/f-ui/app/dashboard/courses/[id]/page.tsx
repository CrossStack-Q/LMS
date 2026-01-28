import CourseHeader from "@/components/courses/CourseHeader";
import CourseContent from "@/components/courses/CourseContent";
import CourseSidebar from "@/components/courses/CourseSidebar";

interface CoursePageProps {
  params: Promise<{ id: string }>; // params is actually a Promise
}

export default async function CoursePage({ params }: CoursePageProps) {
  const resolvedParams = await params; // ✅ unwrap the Promise
  const { id } = resolvedParams;

  let course = null;

  try {
    const res = await fetch(`http://localhost:8080/api/v1/courses/${id}`, {
      cache: "no-store", // optional: ensures fresh fetch on every request
    });
    if (res.ok) course = await res.json();
  } catch (err) {
    console.error("Course fetch failed:", err);
  }

  if (!course) {
    return (
      <div className="p-6 text-red-600 text-xl font-semibold">
        ❌ Course with ID "{id}" not found.
      </div>
    );
  }
    

  return (
    <div className="flex flex-col w-full min-h-screen px-4">
      <p className="p-2 text-lg pb-4">
        <span className="text-zinc-500">Courses /&nbsp;</span>
        <span className="font-medium">{course.title}</span>
      </p>

      <div className="grid grid-cols-4 gap-6 mt-6">
        <div className="col-span-3 space-y-6">
          {/* {course.details.long_desc} */}
          <CourseHeader course={course} />
          <CourseContent sections={course.sections} />
        </div>
        <div className="col-span-1">
          <CourseSidebar course={course} />
        </div>
      </div>
    </div>
  );
}
