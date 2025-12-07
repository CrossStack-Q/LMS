export default function CourseHeader({ course }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex items-center gap-3 text-yellow-500 font-medium">
        ⭐ {course.rating} 
        <span className="text-gray-500">based on {course.reviews} reviews</span>
      </div>

      <h1 className="text-2xl font-bold mt-2">{course.title}</h1>

      <p className="text-gray-600 mt-3">{course.description}</p>

      <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
        👩‍🏫 {course.teacher_id}
        •
        {course.details.total_lessons}+ students bought this course
      </div>
    </div>
  );
}
