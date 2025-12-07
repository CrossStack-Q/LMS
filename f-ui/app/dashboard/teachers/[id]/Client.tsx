"use client";

import { useState } from "react";

import TeacherTabs from "@/components/teachers/SeperatePage/TeacherTabs";
import TeacherAbout from "@/components/teachers/SeperatePage/TeacherAbout";
import TeacherSchedule from "@/components/teachers/SeperatePage/TeacherSchedule";
import TeacherReviews from "@/components/teachers/SeperatePage/TeacherReviews";

export default function TeacherProfileClient({ teacher, reviews }: any) {
  const [activeTab, setActiveTab] = useState("Schedule");

  return (
    <>
      <TeacherTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "About me" && <TeacherAbout about={teacher.about} />}
      {activeTab === "Schedule" && <TeacherSchedule />}
      {activeTab === "Reviews" && <TeacherReviews reviews={reviews} />}
    </>
  );
}
