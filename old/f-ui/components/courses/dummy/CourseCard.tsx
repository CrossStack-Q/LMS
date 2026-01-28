import React from "react";
import { Bookmark, BadgeCheck, Users, BookOpen, Flame } from "lucide-react";
import Link from "next/link";
import { Course } from "@/types/course";
import Image from "next/image";

const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
};

const CourseCard: React.FC<Course> = ({
    id,
    created_at,
    updated_at,
    title,
    description,
    cover_image,
    // teacher_id,
    short_desc,
    category_name,
    level,
    teacher_name,
    teacher_image,
    price,
    is_free,
}) => {
    const labelStyle = "bg-gray-400 text-white";

    return (
        <Link
     href={`/dashboard/courses/${id}`}
    >
        <div className="w-full bg-white p-4 rounded-2xl flex flex-col h-72 justify-between cursor-pointer group relative overflow-hidden
                    hover:bg-[#5C76FF] hover:text-white transition-colors duration-300 shadow-lg">

            <div className="text-zinc-500 pb-2 border-b border-zinc-500 text-sm 
                       group-hover:text-white group-hover:border-white transition-colors flex justify-between">
                <span>{category_name}</span>
                <span>{level}</span>

            </div>


            <span className="text-3xl font-semibold mt-2">{title}</span>


            <span className="text-zinc-500 font-medium mt-2 transition-opacity duration-300
                       group-hover:opacity-0">
                {truncateText(short_desc, 100)}
            </span>

            <div className="flex justify-between items-end mt-auto">
                <div className="flex items-center gap-2 transition-opacity duration-300
                       group-hover:opacity-0">
                    <Image width={40} height={40} src={teacher_image} alt={teacher_name} className="rounded-full"/>
                    
                <span>{teacher_name}</span>
                </div>
                <img
                    src={cover_image}
                    className="w-48 h-24 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
            </div>
        </div>
        </Link>
    );
};

export default CourseCard;
