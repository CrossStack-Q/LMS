// "use client";

// export default function CoursesFilters({
//   categories,
//   selectedLevel,
//   setSelectedLevel,
//   selectedCategory,
//   setSelectedCategory
// }) {
//   const levels = ["All", "Easy", "Intermediate", "Advanced"];

//   return (
//     <section className="border-b border-(--gray-500) p-6 flex items-center justify-between">

//       {/* LEVEL FILTER BUTTONS */}
//       <div className="flex gap-6 text-(--gray-700) font-medium">
//         {levels.map(level => (
//           <button
//             key={level}
//             onClick={() => setSelectedLevel(level)}
//             className={`${selectedLevel === level ? "text-(--gray-900)" : ""}`}
//           >
//             {level}
//           </button>
//         ))}
//       </div>

//       {/* CATEGORY DROPDOWN */}
//       <div className="relative">
//         <select
//           className="border border-(--gray-500) text-sm px-3 py-2 rounded-md bg-white"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="All">All Topics</option>
//           {categories.map(cat => (
//             <option key={cat.id} value={cat.name}>{cat.name}</option>
//           ))}
//         </select>
//       </div>

//     </section>
//   );
// }






"use client";

import { Category } from "@/app/courses/page";

type Props = {
  categories: Category[];
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
};

const levels = ["All", "Easy", "Intermediate", "Advanced"];

export default function CoursesFilters({
  categories,
  selectedLevel,
  setSelectedLevel,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <section className="
      border-b border-(--gray-500)
      px-4 sm:px-6 py-4
      flex flex-col sm:flex-row
      gap-4
      sm:items-center sm:justify-between
    ">

      {/* LEVELS */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-(--gray-700) font-medium">
        {levels.map(level => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`
              transition
              ${selectedLevel === level ? "text-(--gray-900)" : ""}
            `}
          >
            {level}
          </button>
        ))}
      </div>

      {/* CATEGORY */}
      <div>
        <select
          className="
            border border-(--gray-500)
            text-sm px-3 py-2
            rounded-md bg-white
            w-full sm:w-auto
          "
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Topics</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

    </section>
  );
}
