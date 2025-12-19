"use client";

export default function CoursesGrid({ courses, selectedLevel, selectedCategory }) {
  const filtered = courses.filter(course => {
    const levelMatch = selectedLevel === "All" || selectedLevel === course.level;
    const categoryMatch = selectedCategory === "All" || selectedCategory === course.category_name;
    return levelMatch && categoryMatch;
  });

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {filtered.map(course => (
          <a
            key={course.id}
            href={`/courses/${course.id}`}
            className="
    border-b border-(--gray-500)
    lg:border-r
    lg:nth-[4n]:border-r-0
    transition block group
    hover:bg-white
  "
          >

            {/* TOP CONTENT */}
            <div className="p-6">
              <div className="flex justify-center h-32 mb-4">
                <img src={course.cover_image} className="h-full object-cover rounded" />
              </div>

              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-sm text-(--gray-500) mt-1">{course.teacher_name}</p>
              <p className="text-sm text-(--gray-500) mt-1">{course.level}</p>

              <p className="text-sm text-(--gray-700) mt-2 leading-relaxed line-clamp-2">
                {course.short_desc}
              </p>
            </div>

            {/* NORMAL FOOTERS */}
            <div className="group-hover:hidden">
              <div className="py-4 px-4 border-t border-(--gray-500) text-center text-sm font-medium">
                {course.is_free ? "Free – No Subscription" : "Access With Subscription"}
              </div>
            </div>

            {/* HOVER GREEN BAR */}
            <div className="hidden group-hover:flex bg-(--primary-green) border-t border-(--gray-500) py-4 px-4 justify-center font-medium text-sm">
              →
            </div>

          </a>
        ))}

      </div>
    </section>
  );
}
