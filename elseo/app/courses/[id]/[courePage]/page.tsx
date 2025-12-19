// "use client";

// import React, { useEffect, useState } from "react";
// import Navbar from "@/app/components/Navbar";
// import Footer from "@/app/components/Footer";
// import CourseHeader from "@/app/components/CoursePage/CourseHeader";
// import CourseSection from "@/app/components/CoursePage/CourseSection";
// import { extractYouTubeId } from "@/utils/yt";

// async function fetchCourse(id: string) {
//   const res = await fetch(`http://localhost:8080/api/v1/courses/${id}`, { cache: "no-store" });
//   return res.json();
// }

// export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {

//   const { id } = React.use(params);

//   const [course, setCourse] = useState<any>(null);

//   const [selectedSection, setSelectedSection] = useState<string>("");
//   const [selectedLesson, setSelectedLesson] = useState<string>("");
//   const [videoId, setVideoId] = useState<string | null>(null);

//   useEffect(() => {
//     fetchCourse(id).then(setCourse);
//   }, [id]);

//   if (!course) return <p>Loading…</p>;

//   async function handleSelect({ sectionTitle, lessonId, lessonTitle }) {
//   setSelectedSection(sectionTitle);
//   setSelectedLesson(lessonTitle);

//   const res = await fetch(`http://localhost:8080/api/v1/courses/1/lessons/${lessonId}`);
//   const data = await res.json();

//   setVideoId(extractYouTubeId(data.video_url));
// }


//   return (
//     <div className="max-w-7xl mx-auto">
//       <Navbar />

//       <div className="border-x border-b border-(--gray-500)">
        
//         <CourseHeader
//           course={course.title}
//           section={selectedSection || "Okay Ji"}
//           lesson={selectedLesson || "Okay ji"}
//         />

//         <CourseSection
//           sections={course.sections}
//           onSelect={handleSelect}
//           selectedVideoId={videoId}
//         />

//         <div className="py-6 border-t border-(--gray-500)"></div>
//       </div>

//       <Footer />
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CourseHeader from "@/app/components/CoursePage/CourseHeader";
import CourseSection from "@/app/components/CoursePage/CourseSection";
import { extractYouTubeId } from "@/utils/yt";
import { Course } from "@/types/course";

async function fetchCourse(id: string): Promise<Course> {
  const res = await fetch(`http://localhost:8080/api/v1/courses/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedSection, setSelectedSection] = useState("Okay Ji");
  const [selectedLesson, setSelectedLesson] = useState("Okay Ji");
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    fetchCourse(id).then(setCourse);
  }, [id]);

  if (!course) return <p>Loading…</p>;

  async function handleSelect({
    sectionTitle,
    lessonId,
    lessonTitle,
  }: {
    sectionTitle: string;
    lessonId: number;
    lessonTitle: string;
  }) {
    setSelectedSection(sectionTitle);
    setSelectedLesson(lessonTitle);

    const res = await fetch(
      `http://localhost:8080/api/v1/courses/${course.id}/lessons/${lessonId}`
    );
    const data = await res.json();

    setVideoId(extractYouTubeId(data.video_url));
  }

  return (
    <div className="max-w-7xl mx-auto w-full">

      <div className="border-x border-b border-(--gray-500)">
        <CourseHeader
          course={course.title}
          section={selectedSection}
          lesson={selectedLesson}
        />

        <CourseSection
          sections={course.sections}
          onSelect={handleSelect}
          selectedVideoId={videoId}
        />

        <div className="py-6 border-t border-(--gray-500)"></div>
      </div>

    </div>
  );
}
