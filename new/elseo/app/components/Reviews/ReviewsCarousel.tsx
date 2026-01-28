"use client"

import React, { useEffect, useState } from "react";

export type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

type Props = {
  title?: string;
  description?: string;
  reviews?: Review[];
};

const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Loki Bhai",
    rating: 4.5,
    date: "1 week ago",
    comment:
      "I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently.",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    rating: 4.7,
    date: "2 weeks ago",
    comment:
      "The structured courses and projects really helped me gain confidence. Highly recommended for backend learners.",
  },
  {
    id: 3,
    name: "Ankit Sharma",
    rating: 4.6,
    date: "3 days ago",
    comment:
      "Clear explanations and practical examples. The Go track is especially solid.",
  },
  {
    id: 4,
    name: "Neha Singh",
    rating: 4.8,
    date: "5 days ago",
    comment:
      "Loved the pacing and real-world focus. Helped me crack my internship interview.",
  },
  {
    id: 5,
    name: "Aman Verma",
    rating: 4.4,
    date: "1 month ago",
    comment:
      "Very clean UI and meaningful content. Would love more advanced tracks.",
  },
];

const ReviewsCarousel: React.FC<Props> = ({
  title = "Reviews",
  description = "What our users say about learning and growing their coding skills with us.",
  reviews = defaultReviews,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Handle responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const total = reviews.length;

  const next = () => {
    setCurrentIndex((prev) => (prev + visibleCount) % total);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      (prev - visibleCount + total) % total
    );
  };

  const visibleReviews = Array.from({ length: visibleCount }).map((_, i) => {
    return reviews[(currentIndex + i) % total];
  });

  return (
    <section className="border-t border-(--gray-500)">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 border-b border-(--gray-500)">
        <div className="flex items-center justify-center p-6 md:border-r border-(--gray-500) bg-(--bg-white)">
          <h2 className="text-3xl sm:text-4xl font-semibold">{title}</h2>
        </div>

        <div className="flex flex-col justify-between">
          <p className="p-6 text-(--gray-500) font-semibold text-base sm:text-lg">
            {description}
          </p>

          <div className="flex justify-end border-t md:border-t-0 border-(--gray-500)">
            <button
              onClick={prev}
              className="px-5 py-3 border-l border-t border-(--gray-500) hover:bg-(--bg-white)"
              aria-label="Previous reviews"
            >
              ←
            </button>
            <button
              onClick={next}
              className="px-5 py-3 border-l border-t border-(--gray-500) hover:bg-(--bg-white)"
              aria-label="Next reviews"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {visibleReviews.map((review, idx) => (
          <article
            key={`${review.id}-${idx}`}
            className="
              p-6 flex flex-col gap-2
              border-b border-(--gray-500)
              lg:border-r
              last:lg:border-r-0
              hover:bg-(--bg-white)
              transition
            "
          >
            <p className="text-lg font-semibold">{review.name}</p>

            <p className="text-(--gray-700) text-sm flex gap-2 items-center">
              <span>{review.rating}</span>
              <span>⭐️⭐️⭐️⭐️</span>
              <span>{review.date}</span>
            </p>

            <p className="text-(--gray-800) text-sm leading-relaxed line-clamp-2">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewsCarousel;
