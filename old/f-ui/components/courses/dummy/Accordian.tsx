"use client"

import { useState, useRef, useEffect } from "react";

export default function Accordion({ sections }) {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {sections.map((section, index) => (
        <div key={section.id} className="border-b border-gray-300">
          <div
            className="flex items-center justify-between py-4 cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-xl font-semibold">{section.title}</h3>
            <button className="text-2xl font-bold">{openIndex === index ? "−" : "+"}</button>
          </div>

          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight:
                openIndex === index
                  ? contentRefs.current[index]?.scrollHeight + "px"
                  : "0px",
            }}
          >
            <div className="py-4">
              {section.lessons.length > 0 ? (
                <ul className="list-disc ml-6 space-y-2 text-lg">
                  {section.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      {lesson.lesson_type === "video" && "🎥 "}
                      {lesson.lesson_type === "reading" && "📘 "}
                      {lesson.lesson_type === "exercise" && "📝 "}
                      {lesson.lesson_type === "quiz" && "❓ "}
                      {lesson.title} ({Math.floor(lesson.duration_sec / 60)} min)
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No lessons available.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
