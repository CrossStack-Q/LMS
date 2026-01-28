// import React from 'react'
// import Spacing from './Spacing'

// type Props = {}

// const Reviews = (props: Props) => {
//     return (
//         <div className="grid grid-cols-4 grid-rows-2 border-y border-(--gray-500)">
//             <div className="col-span-1 row-span-2 border-r border-(--gray-500) flex flex-col p-6 gap-1 cursor-pointer">
//                 <p className='text-xl font-semibold'>Loki Bhai</p>
//                 <p className='text-(--gray-700)'><span>4.5</span>
//                 <span>⭐️⭐️⭐️⭐️</span>
//                 <span>1 Week ago</span></p>
//                 <p className='text-(--gray-800)'>
//                     I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!
//                 </p>
//             </div>
//             <div className="col-span-1 row-span-2 border-r border-(--gray-500) flex flex-col p-6 gap-1 cursor-pointer">
//                 <p className='text-xl font-semibold'>Loki Bhai</p>
//                 <p className='text-(--gray-700)'><span>4.5</span>
//                 <span>⭐️⭐️⭐️⭐️</span>
//                 <span>1 Week ago</span></p>
//                 <p className='text-(--gray-800)'>
//                     I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!
//                 </p>
//             </div>
//             <div className="col-span-1 row-span-2 border-r border-(--gray-500) flex flex-col p-6 gap-1 cursor-pointer">
//                 <p className='text-xl font-semibold'>Loki Bhai</p>
//                 <p className='text-(--gray-700)'><span>4.5</span>
//                 <span>⭐️⭐️⭐️⭐️</span>
//                 <span>1 Week ago</span></p>
//                 <p className='text-(--gray-800)'>
//                     I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!
//                 </p>
//             </div>
//             <div className="col-span-1 row-span-2 flex flex-col p-6 gap-1 cursor-pointer">
//                 <p className='text-xl font-semibold'>Loki Bhai</p>
//                 <p className='text-(--gray-700)'><span>4.5</span>
//                 <span>⭐️⭐️⭐️⭐️</span>
//                 <span>1 Week ago</span></p>
//                 <p className='text-(--gray-800)'>
//                     I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!
//                 </p>
//             </div>


//         </div>

//     )
// }

// export default Reviews



import React from "react";

export type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

type Props = {
  reviews?: Review[];
};

const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Loki Bhai",
    rating: 4.5,
    date: "1 week ago",
    comment:
      "I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!",
  },
  {
    id: 2,
    name: "Loki Bhai",
    rating: 4.5,
    date: "1 week ago",
    comment:
      "I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!",
  },
  {
    id: 3,
    name: "Loki Bhai",
    rating: 4.5,
    date: "1 week ago",
    comment:
      "I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!",
  },
  {
    id: 4,
    name: "Loki Bhai",
    rating: 4.5,
    date: "1 week ago",
    comment:
      "I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!",
  },
];

const Reviews: React.FC<Props> = ({ reviews = defaultReviews }) => {
  return (
    <section className="border-y border-(--gray-500)">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review, index) => (
          <article
            key={review.id}
            className={`
              p-6 flex flex-col gap-2 cursor-pointer
              border-b border-(--gray-500)
              ${index !== reviews.length - 1 ? "lg:border-r" : ""}
              hover:bg-(--bg-white)
              transition
            `}
          >
            <p className="text-lg sm:text-xl font-semibold">
              {review.name}
            </p>

            <p className="text-(--gray-700) text-sm sm:text-base flex flex-wrap gap-2 items-center">
              <span>{review.rating}</span>
              <span>⭐️⭐️⭐️⭐️</span>
              <span>{review.date}</span>
            </p>

            <p className="text-(--gray-800) text-sm sm:text-base leading-relaxed">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
