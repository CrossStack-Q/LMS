"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import CourseSepDesc from "@/app/components/Courses/CourseSepDesc";
import ReviewHeader2 from "@/app/components/Reviews/ReviewHeader2";
import Reviews from "@/app/components/Reviews/Reviews";

async function fetchCourse(id: string) {
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

  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    fetchCourse(id).then(setCourse);
  }, [id]);

  if (!course) return <p className="p-8">Loading…</p>;

  
  return (
    <main className="min-h-screen text-(--gray-900) pb-8">
      <Navbar />
      <div className="border-x-2 border-(--gray-500) max-w-7xl mx-auto">
        <div className=' border-b-2 border-(--gray-500) grid grid-cols-4'>
          <div className='border-r-2 border-(--gray-500) py-4'>
            <p className='text-center'>
              {`<`}-- Back
            </p>
          </div>
          <div className='border-r-2 border-(--gray-500) py-4'></div>
          <div className='border-r-2 border-(--gray-500) py-4'></div>
          <div className='py-4'></div>
        </div>
      <Hero text={course.title} desc={course.description}
        author={`Harshita Sharma`}
        rating={`4.5 ⭐️⭐️⭐️⭐️⭐️ [107 ratings] `}
        level={course.level}
      />
      <CourseSepDesc/>
      <ReviewHeader2/>
      <Reviews/>
      <div className='py-12 border-b-2 border-(--gray-500)'>

      </div>

      {/* <TopicsSection />  */}
      </div>
      <Footer />
    </main>
  )
}
