import Link from "next/link";
import React from "react";

interface Course {
    id: string | number;
    title: string;
    total_lessons: number;
}

interface TeacherCoursesTabProps {
    courses: Course[];
}

const TeacherCoursesTab: React.FC<TeacherCoursesTabProps> = ({ courses }) => {
    if (!courses || courses.length === 0) {
        return <div className="p-4">No courses available</div>;
    }

    return (
        <div className="p-4 rounded-md ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
                    <div
                        
                        className="group bg-white hover:bg-[#5C76FF] cursor-pointer rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold mb-2 group-hover:text-white group-hover:text-2xl">
                            {course.title}
                        </h3>

                        <p className="text-zinc-500 group-hover:text-white group-hover:font-semibold">
                            {course.total_lessons} lessons
                        </p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TeacherCoursesTab;
