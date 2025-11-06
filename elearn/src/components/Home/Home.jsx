import React from "react";
import TopBar from "./TopBar";
import TeacherCard from "./TeacherCard";
import TopBar2 from "./TopBar2";

const Home = () => {
  const teachers = [
    {
      name: "Carole Towne",
      designation: "Economics teacher",
      intro:
        "Ready to unravel the complexities of supply, demand, and market forces? Dive into my Economics course now!",
      lessons: 132,
      courses: 24,
      students: 250,
      price: 32,
      oldPrice: 46,
      rating: 4.9,
      label: "TOP Tutor",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      sale: true,
    },
    {
      name: "Ralph Legros",
      designation: "Economics teacher",
      intro:
        "From micro to macroeconomics, discover the keys to understanding economic phenomena in my comprehensive courses.",
      lessons: 174,
      courses: 32,
      students: 250,
      price: 23,
      oldPrice: 32,
      rating: 4.9,
      label: "Certified",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      sale: true,
    },
    {
      name: "Jenny Wilson",
      designation: "Economics teacher",
      intro:
        "Economics isn't just a subject - it's the lens through which we view society. I will help you explore its profound implications.",
      lessons: 116,
      courses: 17,
      students: 150,
      price: 17,
      rating: 4.9,
      label: "TOP Tutor",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      sale: false,
    },
    {
      name: "Jenny Wilson 2",
      designation: "Economics teacher",
      intro:
        "Economics isn't just a subject - it's the lens through which we view society. I will help you explore its profound implications.",
      lessons: 116,
      courses: 17,
      students: 150,
      price: 17,
      rating: 4.9,
      label: "TOP Tutor",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      sale: false,
    },
    {
      name: "Jenny Wilson 3",
      designation: "Economics teacher",
      intro:
        "Economics isn't just a subject - it's the lens through which we view society. I will help you explore its profound implications.",
      lessons: 116,
      courses: 17,
      students: 150,
      price: 17,
      rating: 4.9,
      label: "TOP Tutor",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      sale: false,
    },
  ];

  return (
    <div className="h-full px-6 overflow-y-auto hidescroll">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 bg-gray-50 z-50 pb-1">
        <TopBar />
      </div>

      {/* Sticky Second Top Bar */}
      <div className="sticky top-[60px] bg-gray-50 z-40 pb-2">
        <TopBar2 />
      </div>

      {/* Main Content */}
      <div className="mt-4 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">HTML Teachers</h2>
          <div className="rounded-xl overflow-x-auto scroll-smooth max-w-full hidescroll">
            <div className="flex gap-6 flex-nowrap min-w-max py-2">
              {teachers.map((t, index) => (
                <TeacherCard key={index} {...t} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">CSS Teachers</h2>
          <div className="rounded-xl overflow-x-auto scroll-smooth max-w-full hidescroll">
            <div className="flex gap-6 flex-nowrap min-w-max py-2">
              {teachers.map((t, index) => (
                <TeacherCard key={index} {...t} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
