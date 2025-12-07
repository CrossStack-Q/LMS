"use client";

import { useState } from "react";

import TeacherTabs from "./TeacherTabs";
import TeacherAbout from "./TeacherAbout";
import TeacherSchedule from "./TeacherSchedule";
import TeacherReviews from "./TeacherReviews";

export default function TeacherTabsClient({ teacher, reviews }: any) {
  const [activeTab, setActiveTab] = useState("About me");

  return (
    <>
      <TeacherTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "About me" && <TeacherAbout about={teacher.about} />}
      {activeTab === "Schedule" && <TeacherSchedule />}
      {activeTab === "Reviews" && <TeacherReviews reviews={reviews} />}
    </>
  );
}
