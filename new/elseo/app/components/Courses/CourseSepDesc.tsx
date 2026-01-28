"use client";

import { useRouter, usePathname } from "next/navigation";

const CourseSepDesc: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  function handleStartCourse() {
    router.push(`${pathname}/lesson`);
  }

  return (
    <section className="border-t border-(--gray-500)">
      <div className="grid grid-cols-1 lg:grid-cols-6">

        {/* ================= MOBILE CTA (TOP) ================= */}
        <button
          onClick={handleStartCourse}
          className="
            lg:hidden
            w-full
            bg-(--primary-green)
            p-4
            text-center
            text-base
            font-medium
            border-b border-(--gray-500)
          "
        >
          Start Course
        </button>

        {/* ================= LEFT PANEL (DESKTOP LEFT) ================= */}
        <div
          className="
            order-3 lg:order-1
            lg:col-span-4
            p-4 sm:p-6
            lg:border-r
            border-(--gray-500)
          "
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold py-4">
            What You’ll Learn
          </p>

          <ul className="flex flex-col gap-3 max-w-2xl text-(--gray-700) font-medium pl-4 text-sm sm:text-base">
            <li>
              Explore popular color schemes and their impact on branding.
            </li>
            <li>
              Discover how to choose, design, and test colors effectively.
            </li>
            <li>
              Understand the psychology of color and emotional response.
            </li>
            <li>
              Decode cultural and historical color meanings across societies.
            </li>
          </ul>
        </div>

        {/* ================= RIGHT PANEL (DESKTOP RIGHT) ================= */}
        <div
          className="
            order-2 lg:order-2
            lg:col-span-2
            border-b lg:border-b-0
            lg:border-l
            border-(--gray-500)
          "
        >
          {/* COURSE INCLUDES */}
          <div className="p-4 sm:p-6">
            <p className="text-xl sm:text-2xl font-medium py-4">
              This Course includes
            </p>

            <div className="text-(--gray-700) space-y-1 text-sm sm:text-base">
              <p>6 hours of on-demand video</p>
              <p>Closed captions</p>
              <p>8 Sections • 40 Lectures</p>
            </div>
          </div>

          {/* DESKTOP CTA (BOTTOM RIGHT) */}
          <button
            onClick={handleStartCourse}
            className="
              hidden lg:block
              w-full
              bg-(--primary-green)
              p-4
              text-center
              text-base sm:text-lg
              font-medium
              border-t border-(--gray-500)
              cursor-pointer
            "
          >
            Start Course
          </button>
        </div>

      </div>
    </section>
  );
};

export default CourseSepDesc;
