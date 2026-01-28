// import React from 'react'

// type Props = {}

// const Courses = (props: Props) => {
//     return (
//         <div className="grid grid-cols-4 grid-rows-4">
//             <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
//             <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
//             <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
//             <div className="border-b border-(--gray-500) hidden md:block"></div>

//             <div className="col-span-2 flex items-center justify-center border-r border-b border-(--gray-500) p-6 bg-(--bg-white)">
//                 <h2 className="text-4xl font-semibold">Courses</h2>
//             </div>

//             <div className="col-span-1 border-b border-r border-(--gray-500) p-6 flex justify-center items-center cursor-pointer">
//                 <div className='flex bg-(--bg-white) text-xl border-y border-l-2 border-(--gray-500) hover:bg-(--primary-green) hover:border-(--primary-green)'>
//                     <div className='w-fit px-4 py-2 bg-(--bg-white) text-xl border-y border-l-2 border-(--gray-500) hover:bg-(--primary-green) hover:border-(--primary-green)'>
//                         Browse courses
//                     </div>
//                     <div className='px-4 py-2 bg-(--primary-green) text-xl text-(--primary-dark) border-2 border-(--primary-green)'>
//                         {`>`}
//                     </div>
//                 </div>

//             </div>
//             <div className="col-span-1 border-b border-(--gray-500) p-6">
//                 <p className="text-(--gray-500) font-semibold text-lg leading-relaxed">
//                     Dive into world of Software Engineering with video courses.
//                 </p>
//             </div>

//             <div className="col-span-1 row-span-2 border-r border-(--gray-500) gap-4 flex flex-col items-center p-6 hover:bg-(--bg-white) cursor-pointer">
//                 <div className="w-48 h-auto flex items-center justify-center ">
//                     <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/e4d7a1154960861.634c180054d25.png" alt="" />
//                 </div>
//                 <div className=''>
//                     <h3 className="text-2xl font-semibold">Go Intro</h3>
//                     <p className="text-green-700 mb-2">by Anurag Sharma</p>
//                     <p className="text-gray-700 mb-4">
//                         Start your Go programming journey, discover the simplicity and speed of this modern language as you learn fundamental concepts, syntax, and how to build basic applications.
//                     </p>
//                     <div className="bg-green-400 text-black px-4 py-2 hidden group-hover:flex">
//                         <span>
//                             Start learning →
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             <div className="col-span-1 row-span-2 border-r border-(--gray-500) gap-4 flex flex-col items-center p-6 hover:bg-(--bg-white) cursor-pointer">
//                 <div className="w-48 h-auto flex items-center justify-center ">
//                     <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/e4d7a1154960861.634c180054d25.png" alt="" />
//                 </div>
//                 <div className=''>
//                     <h3 className="text-2xl font-semibold">Go Intro</h3>
//                     <p className="text-green-700 mb-2">by Anurag Sharma</p>
//                     <p className="text-gray-700 mb-4">
//                         Start your Go programming journey, discover the simplicity and speed of this modern language as you learn fundamental concepts, syntax, and how to build basic applications.
//                     </p>
//                     <div className="bg-green-400 text-black px-4 py-2 hidden group-hover:flex">
//                         <span>
//                             Start learning →
//                         </span>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-span-1 row-span-2 border-r border-(--gray-500) gap-4 flex flex-col items-center p-6 hover:bg-(--bg-white) cursor-pointer">
//                 <div className="w-48 h-auto flex items-center justify-center ">
//                     <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/e4d7a1154960861.634c180054d25.png" alt="" />
//                 </div>
//                 <div className=''>
//                     <h3 className="text-2xl font-semibold">Go Intro</h3>
//                     <p className="text-green-700 mb-2">by Anurag Sharma</p>
//                     <p className="text-gray-700 mb-4">
//                         Start your Go programming journey, discover the simplicity and speed of this modern language as you learn fundamental concepts, syntax, and how to build basic applications.
//                     </p>
//                     <div className="bg-green-400 text-black px-4 py-2 hidden group-hover:flex">
//                         <span>
//                             Start learning →
//                         </span>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-span-1 row-span-2 gap-4 flex flex-col items-center p-6 hover:bg-(--bg-white) cursor-pointer">
//                 <div className="w-48 h-auto flex items-center justify-center ">
//                     <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/e4d7a1154960861.634c180054d25.png" alt="" />
//                 </div>
//                 <div className=''>
//                     <h3 className="text-2xl font-semibold">Go Intro</h3>
//                     <p className="text-green-700 mb-2">by Anurag Sharma</p>
//                     <p className="text-gray-700 mb-4">
//                         Start your Go programming journey, discover the simplicity and speed of this modern language as you learn fundamental concepts, syntax, and how to build basic applications.
//                     </p>
//                     <div className="bg-green-400 text-black px-4 py-2 hidden group-hover:flex">
//                         <span>
//                             Start learning →
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Courses







import React from "react";

export type Course = {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
};

type Props = {};

const courses: Course[] = Array.from({ length: 4 }).map((_, i) => ({
  id: i,
  title: "Go Intro",
  author: "Anurag Sharma",
  description:
    "Start your Go programming journey, discover the simplicity and speed of this modern language as you learn fundamental concepts, syntax, and how to build basic applications.",
  image:
    "https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/e4d7a1154960861.634c180054d25.png",
}));

const Courses: React.FC<Props> = () => {
  return (
      <section className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-(--gray-500)">
          <div className="hidden lg:block border-r border-(--gray-500)" />
          <div className="hidden lg:block border-r border-(--gray-500)" />

          <div className="p-6 flex items-center justify-center border-r border-(--gray-500)">
            <h2 className="text-3xl sm:text-4xl font-semibold">Courses</h2>
          </div>

          <div className="p-6">
            <p className="text-(--gray-500) font-semibold text-base sm:text-lg leading-relaxed">
              Dive into the world of Software Engineering with video courses.
            </p>
          </div>
        </div>

        {/* ACTION ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-(--gray-500)">
          <div className="p-6 flex justify-center items-center border-r border-(--gray-500)">
            <button className="
              flex items-center
              bg-(--bg-white)
              border border-(--gray-500)
              hover:bg-(--primary-green)
              transition
            ">
              <span className="px-4 py-2 text-base sm:text-lg">
                Browse courses
              </span>
              <span className="px-4 py-2 bg-(--primary-green) text-(--primary-dark)">
                →
              </span>
            </button>
          </div>

          <div className="p-6">
            <p className="text-(--gray-500) font-semibold text-base sm:text-lg">
              Learn through structured paths designed for real-world skills.
            </p>
          </div>
        </div>

        {/* COURSES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className={`
                group
                p-6
                flex flex-col items-center
                gap-4
                border-b border-(--gray-500)
                ${idx !== courses.length - 1 ? "lg:border-r" : ""}
                hover:bg-(--bg-white)
                transition
              `}
            >
              <div className="w-40 sm:w-48 flex justify-center">
                <img src={course.image} alt={course.title} />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {course.title}
                </h3>
                <p className="text-green-700 mb-2">
                  by {course.author}
                </p>

                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  {course.description}
                </p>

                <div className="
                  inline-flex
                  px-4 py-2
                  bg-green-400
                  text-black
                  text-sm sm:text-base
                  lg:opacity-0 lg:group-hover:opacity-100
                  transition
                ">
                  Start learning →
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
  );
};

export default Courses;
