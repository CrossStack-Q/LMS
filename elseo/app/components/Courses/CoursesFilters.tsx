// export default function CoursesFilters() {
//   return (
//     <section className="border-b-2 border-(--gray-500) p-6 flex items-center justify-between">
//       {/* Left tabs */}
//       <div className="flex gap-6 text-(--gray-700) font-medium">
//         <button className="text-(--gray-900)">All</button>
//         <button>Beginner</button>
//         <button>Intermediate</button>
//         <button>Advanced</button>
//       </div>

//       {/* Dropdown */}
//       <div className="relative">
//         <select className="border border-(--gray-500) text-sm px-3 py-2 rounded-md bg-white">
//           <option>All Topics</option>
//           <option>UX Design</option>
//           <option>UI Design</option>
//           <option>Typography</option>
//           <option>Color</option>
//           <option>Motion Design</option>
//         </select>
//       </div>
//     </section>
//   );
// }





"use client";

export default function CoursesFilters({
  categories,
  selectedLevel,
  setSelectedLevel,
  selectedCategory,
  setSelectedCategory
}) {
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  return (
    <section className="border-b-2 border-(--gray-500) p-6 flex items-center justify-between">

      {/* LEVEL FILTER BUTTONS */}
      <div className="flex gap-6 text-(--gray-700) font-medium">
        {levels.map(level => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`${selectedLevel === level ? "text-(--gray-900)" : ""}`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* CATEGORY DROPDOWN */}
      <div className="relative">
        <select
          className="border border-(--gray-500) text-sm px-3 py-2 rounded-md bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Topics</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

    </section>
  );
}
