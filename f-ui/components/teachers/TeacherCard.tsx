import React from "react";
import { Bookmark, BadgeCheck, Users, BookOpen, Flame } from "lucide-react";
import Link from "next/link";
import { Teacher } from "@/types/teacher";

const labelColors: Record<string, string> = {
  "TOP Tutor": "bg-green-500 text-white",
  Certified: "bg-purple-500 text-white",
  IELTS: "bg-zinc-900 text-white",
  "New Tutor": "bg-blue-500 text-white",
  "High Demand": "bg-red-500 text-white",
};

// Helper to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
};



const TeacherCard: React.FC<Teacher> = ({
  id,
  created_at,
  updated_at,
  bio,
  tags,
  name,
  designation,
  profile_picture_link,
  is_top_tutor,
  rating,
  courses,
  students,
  sessions,
  user_id,
}) => {

  return (
    <div
      className={`w-80 rounded-2xl shadow-md p-5 shrink-0 transition-all duration-300 hover:scale-[1.02] ${is_top_tutor ? "bg-zinc-800 text-white" : "bg-white text-zinc-800"
        }`}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between">
        <img
          src={profile_picture_link}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 justify-between">
            <span className="font-semibold">{name}</span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full `}
            >
              {is_top_tutor ? <span className="bg-green-100 text-green-600 py-1 px-2 rounded-2xl">Top Tutor</span> : <></>}
            </span>
          </div>


          <div className="flex items-center space-x-4 justify-between">
            <p
              className={`text-sm ${is_top_tutor ? "text-gray-300" : "text-gray-500"
                } capitalize`}
            >
              {designation}
            </p>
            <div
              className={`flex items-center space-x-1 text-sm font-semibold ${is_top_tutor ? "text-yellow-400" : "text-yellow-600"
                }`}
            >
              ⭐ {rating}
            </div>
            <Bookmark
              className={`w-4 h-4 ${is_top_tutor ? "text-white/70" : "text-gray-500"
                } cursor-pointer`}
            />
          </div>

        </div>
      </div>

      {/* Intro */}
      <p
        className={`text-sm mt-3 leading-snug ${is_top_tutor ? "text-gray-300" : "text-gray-600"
          }`}
      >
        {truncateText(bio, 100)}
      </p>

      {/* Stats Section */}
      <div
        className={`mt-4 flex flex-col space-y-1 text-sm ${is_top_tutor ? "text-gray-400" : "text-gray-500"
          }`}
      >
        <p className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> {sessions} lessons conducted
        </p>
        <p className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> {courses} courses{" "}
          <span className="mx-2">|</span>
          <Users className="w-4 h-4" /> {students}+ students
        </p>
      </div>

      {/* Footer Section */}
      <div className="mt-5 flex justify-between items-center">
        {/* <div className="flex items-center space-x-2"> */}

        {/* <span className="text-lg font-bold">
            price00
            <span className="text-sm font-normal text-gray-400 ml-1">/hr</span>
          </span> */}
        {/* {is_top_tutor && students && (
            <span className="line-through text-gray-500 text-sm">
              ${students}00
            </span>
          )} */}
        {/* </div> */}
        <div className="flex items-center space-x-2">
          {is_top_tutor && <Flame className="w-4 h-4 text-orange-500" />}
          Hello
        </div>
        <Link href={`/dashboard/teachers/${id}`}>
          <button
            className={`px-4 py-1.5 rounded-lg font-medium border transition hover:cursor-pointer ${is_top_tutor
              ? "bg-white text-zinc-800 hover:bg-zinc-800 hover:text-white"
              : "bg-zinc-800 text-white hover:bg-white hover:text-zinc-800"
              }`}
          >
            View More
          </button>
        </Link>

      </div>
    </div>
  );
};

export default TeacherCard;
