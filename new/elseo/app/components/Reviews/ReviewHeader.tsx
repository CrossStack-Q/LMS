// import React from 'react'

// type Props = {}

// const ReviewHeader = (props: Props) => {
//   return (
//     <div className='grid grid-cols-4 border-t border-(--gray-500)'>
//         <div className="col-span-2 flex items-center justify-center border-r border-(--gray-500) p-6 bg-(--bg-white)">
//                 <h2 className="text-4xl font-semibold">Reviews</h2>
//             </div>

//             <div className="col-span-2 border-(--gray-500) flex flex-col justify-between">
//                 <p className="text-(--gray-500) font-semibold text-lg leading-relaxed p-6">
//                     What our users say about learning and growing their coding skills with us.
//                 </p>
//                 <div className='flex justify-end'>
//                     <div>
//                         <button className='px-4 py-2 border-l-2 border-t border-(--gray-500)'>
//                             {`<`}
//                         </button>
//                         <button className='px-4 py-2 border-t border-l-2 border-(--gray-500)'>
//                             {`>`}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//     </div>
//   )
// }

// export default ReviewHeader









import React from "react";

export type ReviewHeaderProps = {
  title?: string;
  description?: string;
  onPrev?: () => void;
  onNext?: () => void;
};

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  title = "Reviews",
  description = "What our users say about learning and growing their coding skills with us.",
  onPrev,
  onNext,
}) => {
  return (
    <section className="border-t border-(--gray-500)">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">

        {/* LEFT */}
        <div className="flex items-center justify-center p-6 md:border-r border-(--gray-500) bg-(--bg-white)">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            {title}
          </h2>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between">
          <p className="p-6 text-(--gray-500) font-semibold text-base sm:text-lg leading-relaxed">
            {description}
          </p>

          <div className="flex justify-end border-t md:border-t-0 border-(--gray-500)">
            <button
              onClick={onPrev}
              className="
                px-5 py-3
                border-l border-(--gray-500)
                hover:bg-(--bg-white)
                transition
              "
              aria-label="Previous review"
            >
              ←
            </button>

            <button
              onClick={onNext}
              className="
                px-5 py-3
                border-l border-(--gray-500)
                hover:bg-(--bg-white)
                transition
              "
              aria-label="Next review"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewHeader;
