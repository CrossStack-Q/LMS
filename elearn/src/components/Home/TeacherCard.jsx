import React from "react";
import { Bookmark, BadgeCheck, Users, BookOpen, Flame } from "lucide-react";

const labelColors = {
  "TOP Tutor": "bg-green-500 text-white",
  Certified: "bg-purple-500 text-white",
  IELTS: "bg-zinc-900 text-white",
  "New Tutor": "bg-blue-500 text-white",
  "High Demand": "bg-red-500 text-white",
};

// Helper to truncate text to 15 words
const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
};

const TeacherCard = ({
  name,
  designation,
  intro,
  lessons,
  courses,
  students,
  price,
  oldPrice,
  rating,
  label,
  image,
  sale = false,
}) => {
  const labelStyle = labelColors[label] || "bg-gray-400 text-white";

  return (
    <div
      className={`w-80 rounded-2xl shadow-md p-5 flex-shrink-0 transition-all duration-300 hover:scale-[1.02] ${
        sale ? "bg-zinc-800 text-white" : "bg-white text-zinc-800"
      }`}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-semibold flex items-center space-x-1">
              <span>{name}</span>
              <BadgeCheck className="w-4 h-4 text-blue-500 inline-block ml-1" />
            </h3>
            <p
              className={`text-sm ${
                sale ? "text-gray-300" : "text-gray-500"
              } capitalize`}
            >
              {designation}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-1">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${labelStyle}`}
          >
            {label}
          </span>
          <div
            className={`flex items-center space-x-1 text-sm font-semibold ${
              sale ? "text-yellow-400" : "text-yellow-600"
            }`}
          >
            ⭐ {rating}
          </div>
          <Bookmark
            className={`w-4 h-4 ${
              sale ? "text-white/70" : "text-gray-500"
            } cursor-pointer`}
          />
        </div>
      </div>

      {/* Intro */}
      <p
        className={`text-sm mt-3 leading-snug ${
          sale ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {truncateText(intro, 100)}
      </p>

      {/* Stats Section */}
      <div
        className={`mt-4 flex flex-col space-y-1 text-sm ${
          sale ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <p className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> {lessons} lessons conducted
        </p>
        <p className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> {courses} courses{" "}
          <span className="mx-2">|</span>
          <Users className="w-4 h-4" /> {students}+ students
        </p>
      </div>

      {/* Footer Section */}
      <div className="mt-5 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {sale && <Flame className="w-4 h-4 text-orange-500" />}
          <span className="text-lg font-bold">
            ${price}
            <span className="text-sm font-normal text-gray-400 ml-1">
              /hr
            </span>
          </span>
          {sale && (
            <span className="line-through text-gray-500 text-sm">
              ${oldPrice}
            </span>
          )}
        </div>

        <button
          className={`px-4 py-1.5 rounded-lg font-medium border transition hover:cursor-pointer ${
            sale
              ? "bg-white text-zinc-800 hover:bg-zinc-800 hover:text-white"
              : "bg-zinc-800 text-white hover:bg-white hover:text-zinc-800"
          }`}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;
