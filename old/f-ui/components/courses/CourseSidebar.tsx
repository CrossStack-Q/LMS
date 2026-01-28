"use client"

export function extractYouTubeId(url: string) {
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

import { useRouter } from "next/navigation";

export default function CourseSidebar({ course }) {
  const router = useRouter();

  const handleStartNow = () => {
    // save course ID or subtopic ID to localStorage
    localStorage.setItem("CourseId", course.id.toString());
    router.push(`/dashboard/courses/${course.id}/lesson`); // path to TutorialsPage
  };

  return (
    <aside className="p-6 bg-white rounded-xl shadow h-fit sticky top-6">
      <iframe
        src={`https://www.youtube.com/embed/${extractYouTubeId(course.details.preview_video)}`}
        title="Course Preview"
        allowFullScreen
        className="w-full h-full rounded-lg"
      ></iframe>

      <div className="mt-4">
        <div className="text-3xl font-bold">${course.price}</div>
        <button
          onClick={handleStartNow}
          className="w-full bg-purple-600 text-white rounded-lg py-3 mt-4"
        >
          Start Now
        </button>
      </div>
    </aside>
  );
}

