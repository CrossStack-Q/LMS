import { BadgeCheck } from "lucide-react";

export default function TeacherHeader({ teacher }: any) {
  return (
    <div className="">
      <div className="flex items-center">
      <img
        src={teacher.profile_picture_link}
        alt={teacher.name}
        className="w-24 h-24 rounded-full"
      />
      <div className="px-4 flex flex-col h-24 justify-center">
        <p className="text-sm space-x-2 text-center">
          {teacher.is_top_tutor?<span className="rounded-full bg-green-200 text-green-800 py-1 px-2">Top Tutor</span>:<></>}
          
          <span className="rounded-full bg-yellow-100 text-yellow-500 py-1 px-2">⭐️ {teacher.rating}</span>
          <span className="text-zinc-500">based on <span className="text-purple-700 underline hover:text-blue-600 cursor-pointer">236 reviews</span></span>
        </p>
        <span className="text-2xl font-semibold flex items-center gap-2 px-1">
          {teacher.name}
          <BadgeCheck className="w-5 h-5 text-blue-500" />
        </span>
        <span className="text-zinc-500 px-1">{teacher.designation}</span>
      </div>
      </div>
      <div className="text-sm mt-2 text-zinc-500 pr-4">{teacher.bio}</div>
    </div>
  );
}
