
"use client";

import React, { useEffect, useState } from "react";
import Hero from "@/app/components/Hero";
import CourseSepDesc from "@/app/components/Courses/CourseSepDesc";
import ReviewsCarousel from "@/app/components/Reviews/ReviewsCarousel";


type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
};


async function fetchCourse(id: string): Promise<Course> {
  const res = await fetch(`http://localhost:8080/api/v1/courses/${id}`, {
    cache: "no-store",
  });
  return res.json();
}


export default function CourseOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourse(id).then(setCourse);
  }, [id]);

  if (!course) {
    return <p className="p-6 sm:p-8">Loading…</p>;
  }

  return (
    <main className="max-w-7xl mx-auto border-x border-(--gray-500) w-full text-(--gray-900)">

      <div className="
        border-b border-(--gray-500)
        grid grid-cols-1 lg:grid-cols-4
      ">
        <div className="p-4 border-b lg:border-b-0 lg:border-r border-(--gray-500)">
          <p className="text-center cursor-pointer">
            ← Back
          </p>
        </div>

        <div className="hidden lg:block border-r border-(--gray-500) py-4" />
        <div className="hidden lg:block border-r border-(--gray-500) py-4" />
        <div className="hidden lg:block py-4" />
      </div>

      <Hero
        text={course.title}
        desc={course.description}
        author="Harshita Sharma"
        rating="4.5 ⭐️⭐️⭐️⭐️⭐️ [107 ratings]"
        level={course.level}
        isImage={true}
        imageText={course.title}
      />

      <CourseSepDesc />

      <ReviewsCarousel />

      <div className="py-10 sm:py-12 border-b border-(--gray-500)" />

    </main>
  );
}
