import { Users, BookOpen } from "lucide-react";

export default function TeacherStats({ teacher }: any) {
  return (
    <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
      <span>{teacher.experience} experience &nbsp;&nbsp;|</span>
      <span>📘 {teacher.courses} courses &nbsp;&nbsp;|</span>
      <span className="flex items-center gap-1">
        <Users className="w-4" /> {teacher.students}+ students &nbsp;&nbsp;|
      </span>
      <span>📚 {teacher.lessons} lessons conducted</span>
    </div>
  );
}
