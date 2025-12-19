// "use client";

// import React, { useState } from "react";

// export default function CourseSection({
//   sections,
//   onSelect,
//   selectedVideoId
// }: {
//   sections: any[];
//   onSelect: (info: {
//     sectionId: number;
//     sectionTitle: string;
//     lessonId: number;
//     lessonTitle: string;
//   }) => void;
//   selectedVideoId: string | null;
// }) {
//   const [openSection, setOpenSection] = useState<number | null>(1);

//   const toggleSection = (id: number) => {
//     setOpenSection(prev => (prev === id ? null : id));
//   };

//   return (
//     <div className="border-t border-(--gray-500) grid grid-cols-4">
//       {/* LEFT SIDEBAR */}
//       <div className="col-span-1 border-r border-(--gray-500) p-6">
//         {sections.map((section) => {
//           const isOpen = openSection === section.id;

//           return (
//             <div key={section.id}>
//               <button
//                 onClick={() => toggleSection(section.id)}
//                 className={`
//                   w-full flex items-center justify-between cursor-pointer px-4 py-2
//                   text-left font-medium transition-all
//                   ${isOpen ? "bg-white border border-(--gray-500) shadow-sm" : ""}
//                 `}
//               >
//                 <span>{section.order_index}. {section.title}</span>
//                 <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
//                   ▼
//                 </span>
//               </button>

//               {isOpen && (
//                 <div className="pl-8 pt-4 pb-4 space-y-2">
//                   {section.lessons.map((lesson) => (
//                     <div
//                       key={lesson.id}
//                       className="cursor-pointer text-sm hover:font-semibold"
//                       onClick={() =>
//                         onSelect({
//                           sectionId: section.id,
//                           sectionTitle: section.title,
//                           lessonId: lesson.id,
//                           lessonTitle: lesson.title,
//                         })
//                       }
//                     >
//                       {section.order_index}.{lesson.order_index} {lesson.title}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* RIGHT CONTENT AREA */}
//       <div className="col-span-3 p-10">
//         {selectedVideoId ? (
//           <iframe
//             src={`https://www.youtube.com/embed/${selectedVideoId}`}
//             className="w-full h-[500px] rounded-lg border"
//             allowFullScreen
//           ></iframe>
//         ) : (
//           <p className="text-lg text-(--gray-600)">Select a lesson to begin learning.</p>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import { Section } from "@/types/course";

export default function CourseSection({
  sections,
  onSelect,
  selectedVideoId,
}: {
  sections: Section[];
  onSelect: (info: {
    sectionTitle: string;
    lessonId: number;
    lessonTitle: string;
  }) => void;
  selectedVideoId: string | null;
}) {
  const [openSection, setOpenSection] = useState<number | null>(1);

  return (
    <div className="border-t border-(--gray-500) grid grid-cols-4">
      {/* LEFT SIDEBAR */}
      <aside className="col-span-1 border-r border-(--gray-500) p-6">
        {sections.map((section) => {
          const isOpen = openSection === section.id;

          return (
            <div key={section.id}>
              <button
                onClick={() =>
                  setOpenSection(isOpen ? null : section.id)
                }
                className={`
                  w-full flex justify-between px-4 py-2 cursor-pointer 
                  font-medium transition-all
                  ${
                    isOpen
                      ? "bg-white border border-(--gray-500) shadow-sm"
                      : ""
                  }
                `}
              >
                <p className="text-start">
                  {section.order_index}. {section.title}
                </p>
                {/* <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                  ▼
                </span> */}
              </button>

              {/* Lessons */}
              {isOpen && (
                <div className="pl-8 pt-4 pb-4 space-y-2">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="cursor-pointer text-sm hover:font-semibold"
                      onClick={() =>
                        onSelect({
                          sectionTitle: section.title,
                          lessonId: lesson.id,
                          lessonTitle: lesson.title,
                        })
                      }
                    >
                      {section.order_index}.{lesson.order_index} {lesson.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </aside>

      {/* RIGHT CONTENT */}
      <div className="col-span-3 p-10">
        {selectedVideoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            className="w-full h-[500px] rounded-lg border"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-lg text-(--gray-600)">Select a lesson to begin learning.</p>
        )}
      </div>
    </div>
  );
}
