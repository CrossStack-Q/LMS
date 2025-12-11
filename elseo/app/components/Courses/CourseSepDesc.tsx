"use client";

import { useRouter, usePathname } from "next/navigation";

export default function CourseSepDesc() {
  const router = useRouter();
  const pathname = usePathname(); // → e.g. "/course/4"

  function handleStartCourse() {
    router.push(`${pathname}/lesson`);
  }
    return (
        <div className='grid grid-cols-6 border-t-2 border-(--gray-500)'>
            <div className='col-span-4 p-6 border-r-2 border-(--gray-500)'>
                <p className='text-4xl font-semibold py-4'>
                    What You'll Learn
                </p>
                <ul className='flex flex-col gap-2 max-w-2xl text-(--gray-700) font-medium pl-4'>
                    <span className=''>- Explore popular color schemes and their impact on branding. Learn how different color harmonies and contexts influence perception.
                    </span>
                    <span>- Discover how to choose, design, and test colors.</span>
                    <span>- Uncover the psychology of color - Understand how colors affect emotions, moods, and human behavior.</span>
                    <span>- Decode cultural and historical color meanings - See how colors have shaped symbolism across different societies.</span>
                </ul>
            </div>
            <div className='col-span-2 flex flex-col justify-between'>
                <div className='p-6'>
                    <p className='text-2xl font-medium py-6'>
                        This Course includes
                    </p>
                    <div className='text-(--gray-700)'>
                        <p className=''>
                            6 hours of on-demand video
                        </p>
                        <p className=''>
                            Closed captions
                        </p>
                        <p className=''>
                            8 Sections - 40 Lectures
                        </p>
                    </div>
                </div>
                <div className='bg-(--primary-green) p-4 text-center cursor-pointer text-lg border-t-2 border-(--gray-500)'
                onClick={handleStartCourse}
                >
                    Start Course
                </div>

            </div>
        </div>
    )
}
