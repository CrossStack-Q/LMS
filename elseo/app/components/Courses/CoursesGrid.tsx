// const courses = [
//   {
//     image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
//     title: "Figma UI/UX Design  EssentialsEssentials",
//     author: "John Myers",
//     level: "Beginner",
//     rating: "4.5 ★★★★★",
//     desc: "Design a stunning mobile app with Figma with a learn-by-doing approach.",
//     footer: "Free – No Subscription",
//   },
//   {
//     image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
//     title: "UI Design Essentials With FigmaEssentials",
//     author: "John Myers",
//     level: "All levels",
//     rating: "4.5 ★★★★★",
//     desc: "Learn essential UI components and sfv sfdvsdvdsvdsvdsvdsvsdvsho",
//     footer: "Free – No Subscription",
//   },
//   {
//     image: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
//     title: "User Psychology And BehaviourEssentialsE",
//     author: "Kevin Barrett",
//     level: "Beginner",
//     rating: "4.5 ★★★★★",
//     desc: "Learn user psychology and behaviour to design intuitive experiences.",
//     footer: "Free – No Subscription",
//   },
//   {
//     image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
//     title: "Figma UI/UX Design Essentials Essen",
//     author: "John Myers",
//     level: "Beginner",
//     rating: "4.5 ★★★★★",
//     desc: "Design a stunning mobile app with Figma with a learn-by-doing approach.",
//     footer: "Free – No Subscription",
//   },
//   {
//     image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
//     title: "UI Design Essentials With Figma Essentials",
//     author: "John Myers",
//     level: "All levels",
//     rating: "4.5 ★★★★★",
//     desc: "Learn essential UI components and how to creatsdfsdfsdfsgsfgsgbdsfbfdsbe UI kits.",
//     footer: "Free – No Subscription",
//   },
//   {
//     image: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
//     title: "User Psychology And Behaviou Essentials Ess",
//     author: "Kevin Barrett",
//     level: "Beginner",
//     rating: "4.5 ★★★★★",
//     desc: "Learn user psychology and behaviour to design intuitive experiences.",
//     footer: "Free – No Subscription",
//   },
//   {
//     image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
//     title: "UI Design Essentials With Figma Essentials Essentials",
//     author: "John Myers",
//     level: "All levels",
//     rating: "4.5 ★★★★★",
//     desc: "Learn essential UI components and how to creatsdfsdfsdfsgsfgsgbdsfbfdsbe UI kits.",
//     footer: "Free – No Subscription",
//   },
//   {
//     image: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
//     title: "User Psychology And Behaviou Essen",
//     author: "Kevin Barrett",
//     level: "Beginner",
//     rating: "4.5 ★★★★★",
//     desc: "Learn user psychology and behaviour to design intuitive experiences.",
//     footer: "Free – No Subscription",
//   },
// ];

// --------


// export default function CoursesGrid() {
//   return (
//     <section className="">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
//         {courses.map((c, i) => (
//           <div
//             key={i}
//             className="border-b-2 border-(--gray-500) pt-4 hover:shadow-sm transition"
//           >
//             <div className="p-6">
//             <div className="flex justify-center h-32 mb-4">
//               <img src={c.image} alt={c.title} className="h-full object-contain" />
//             </div>

//             <h3 className="text-xl font-semibold">{c.title}</h3>
//             <p className="text-sm text-(--gray-500) mt-1">{c.author}</p>
//             <p className="text-sm text-(--gray-500) mt-1">{c.level}</p>

//             <p className="text-sm text-(--gray-500) mt-1"> 4 ⭐️⭐️⭐️⭐️</p>
//             <p className="text-sm text-(--gray-700) mt-2 leading-relaxed">{c.desc}</p>
//             </div>

//             <div>
//             <div className="py-4 px-4 bg-(--bg-light) border-t border-(--gray-500) text-center text-sm font-medium">
//               {c.footer}
//             </div>
//             <div className="py-4 px-4 bg-(--primary-green) text-center text-sm font-medium">
//               {`---->`}
//             </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




// ----Else -----

// import Link from "next/link";

// async function fetchCourses() {
//   const res = await fetch("http://localhost:8080/api/v1/courses", {
//     cache: "no-store",
//   });
//   return res.json();
// }

// export default async function CoursesGrid() {
//   const courses = await fetchCourses();

//   return (
//     <section>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         {courses.map((c: any) => (
//           <Link
//             key={c.id}
//             href={`/course/${c.id}`}
//             className="border-b-2 border-(--gray-500) pt-4 hover:shadow-sm transition block"
//           >
//             <div className="p-6">
//               <div className="flex justify-center h-32 mb-4">
//                 <img
//                   src={c.cover_image}
//                   alt={c.title}
//                   className="h-full object-contain"
//                 />
//               </div>

//               <h3 className="text-xl font-semibold">{c.title}</h3>
//               <p className="text-sm text-(--gray-500) mt-1">{c.teacher_name}</p>
//               <p className="text-sm text-(--gray-500) mt-1">{c.level}</p>
//               <p className="text-sm text-(--gray-500) mt-1">
//                 {c.teacher_rating} ⭐️
//               </p>

//               <p className="text-sm text-(--gray-700) mt-2 leading-relaxed">
//                 {c.short_desc}
//               </p>
//             </div>

//             {/* Footer */}
//             <div>
//               <div className="py-4 px-4 bg-(--bg-light) border-t border-(--gray-500) text-center text-sm font-medium">
//                 {c.is_free ? "Free – No Subscription" : `${c.price}₹`}
//               </div>
//               <div className="py-4 px-4 bg-(--primary-green) text-center text-sm font-medium">
//                 →
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }



// "use client";

// export default function CoursesGrid({ courses, selectedLevel, selectedCategory }) {

//   const filtered = courses.filter(course => {
//     const levelMatch = selectedLevel === "All" || selectedLevel === course.level;
//     const categoryMatch = selectedCategory === "All" || selectedCategory === course.category_name;
//     return levelMatch && categoryMatch;
//   });

//   return (
//     <section>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

//         {filtered.map(course => (
//           <a
//             key={course.id}
//             href={`/course/${course.id}`}
//             className="border-b-2 border-(--gray-500) hover:shadow-sm transition block"
//           >

//             {/* TOP CARD CONTENT */}
//             <div className="p-6">
//               <div className="flex justify-center h-32 mb-4">
//                 <img src={course.cover_image} className="h-full object-cover rounded" />
//               </div>

//               <h3 className="text-xl font-semibold">{course.title}</h3>
//               <p className="text-sm text-(--gray-500) mt-1">{course.teacher_name}</p>
//               <p className="text-sm text-(--gray-500) mt-1">{course.level}</p>

//               <p className="text-sm text-(--gray-700) mt-2 leading-relaxed">
//                 {course.short_desc}
//               </p>
//             </div>

//             {/* WHITE FOOTER */}
//             <div className="py-4 px-4 bg-white border-t border-(--gray-500) text-center text-sm font-medium">
//               {course.is_free ? "Free – No Subscription" : "Access With Subscription"}
//             </div>

//             {/* GREEN FOOTER */}
//             <div className="py-4 px-4 bg-(--primary-green) text-center text-sm font-medium">
//               →
//             </div>

//           </a>
//         ))}

//       </div>
//     </section>
//   );
// }







"use client";

export default function CoursesGrid({ courses, selectedLevel, selectedCategory }) {
  const filtered = courses.filter(course => {
    const levelMatch = selectedLevel === "All" || selectedLevel === course.level;
    const categoryMatch = selectedCategory === "All" || selectedCategory === course.category_name;
    return levelMatch && categoryMatch;
  });

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {filtered.map(course => (
          <a
  key={course.id}
  href={`/courses/${course.id}`}
  className="
    border-b-2 border-(--gray-500)
    lg:border-r-2
    lg:nth-[4n]:border-r-0
    transition block group
  "
>

            {/* TOP CONTENT */}
            <div className="p-6">
              <div className="flex justify-center h-32 mb-4">
                <img src={course.cover_image} className="h-full object-cover rounded" />
              </div>

              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-sm text-(--gray-500) mt-1">{course.teacher_name}</p>
              <p className="text-sm text-(--gray-500) mt-1">{course.level}</p>

              <p className="text-sm text-(--gray-700) mt-2 leading-relaxed line-clamp-2">
                {course.short_desc}
              </p>
            </div>

            {/* NORMAL FOOTERS */}
            <div className="group-hover:hidden">
              <div className="py-4 px-4 bg-white border-t border-(--gray-500) text-center text-sm font-medium">
                {course.is_free ? "Free – No Subscription" : "Access With Subscription"}
              </div>
            </div>

            {/* HOVER GREEN BAR */}
            <div className="hidden group-hover:flex bg-(--primary-green) border-t border-(--gray-500) py-4 px-4 justify-center font-medium text-sm">
              →
            </div>

          </a>
        ))}

      </div>
    </section>
  );
}
