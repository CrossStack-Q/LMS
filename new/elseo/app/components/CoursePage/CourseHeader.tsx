import { Course,Lesson,Section } from "@/types/course";


export default function CourseHeader({
  course,
  lesson,
  section
}: {
  course: Course["title"];
  lesson: Lesson["title"];
  section: Section["title"];
}) {

  return (
    <div className="grid grid-cols-4">

      <div className="border-r border-(--gray-500) col-span-1 p-6 text-(--gray-700)">
        Courses {`>`} {course}
      </div>

      <div className="col-span-3 p-6"></div>

      <div className="border-r border-t text-2xl border-(--gray-500) col-span-1 p-6 font-semibold">
        {course}
      </div>

      <div className="border-t border-(--gray-500) col-span-3 p-6 flex justify-between items-end">
        <div>
          <p className="text-2xl">Lesson {lesson}</p>
          <p className="text-lg text-(--gray-700)">Section {section}</p>
        </div>

        <div>⭐️ Rate the course</div>
      </div>
    </div>
  );
}
