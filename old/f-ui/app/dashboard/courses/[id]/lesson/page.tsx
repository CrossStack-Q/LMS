"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { extractYouTubeId } from "@/components/courses/CourseSidebar";

const TutorialsPage = () => {
  const params = useParams();
  const { id } = params; // get course id from URL

  const [items, setItems] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(prev => (prev === sectionId ? null : sectionId));
  };

  const handleVideoSelect = (lesson) => {
    setSelectedVideoUrl(lesson.video_url);
  };

  useEffect(() => {
    if (!id) return;

    const fetchSections = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/courses/${id}`);
        if (!response.ok) throw new Error("Failed to fetch sections");

        const data = await response.json();
        setItems(data.sections);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSections();
  }, [id]); // fetch when id changes

  return (
    <div className="flex h-[92vh] p-4 pt-12">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 overflow-y-auto rounded-xl bg-white border-zinc-400 border hidescroll">
        <h2 className="text-xl font-bold">Sections</h2>
        <ul className="mt-4">
          {items.map((section) => (
            <li key={section.id} className="mb-2">
              <h3
                className="text-xl font-semibold flex py-2 rounded-lg items-center cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                {section.title} <span className="text-black text-base pl-1">▼</span>
              </h3>
              {expandedSection === section.id && (
                <ul>
                  {section.lessons?.map((lesson) => (
                    <li
                      key={lesson.id}
                      className={`cursor-pointer flex items-center space-x-1 text-lg my-1 px-2 py-1 rounded-lg hover:bg-gray-200 hover:font-semibold ${
                        selectedVideoUrl === lesson.video_url ? "bg-gray-200 font-semibold" : ""
                      }`}
                      onClick={() => handleVideoSelect(lesson)}
                    >
                      <span>{lesson.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main video player */}
      <main className="w-3/4 p-4 overflow-y-auto hidescroll">
        {selectedVideoUrl ? (
          <iframe
            src={`https://www.youtube.com/embed/${extractYouTubeId(selectedVideoUrl)}`}
            title="Course Video"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        ) : (
          <div className="text-center text-xl">Select video to learn</div>
        )}
      </main>
    </div>
  );
};

export default TutorialsPage;
