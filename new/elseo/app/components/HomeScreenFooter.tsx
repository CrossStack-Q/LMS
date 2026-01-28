// import React from 'react'

// type Props = {}

// const NormalFooter = (props: Props) => {
//   return (
//     <div className='grid grid-cols-4 grid-rows-2'>
//         <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
//             <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
//             <div className="border-r border-b  border-(--gray-500) hidden md:block"></div>
//             <div className=" border-b border-(--gray-500) hidden md:block"></div>
            

//             <div className="col-span-2 border-b border-r border-(--gray-500) flex flex-col justify-between p-6">
//                 <p className="text-(--gray-500) font-semibold text-lg leading-relaxed  text-center">
//                     Get full access to Knowledge -{`>`}
//                 </p>
                
//             </div>

//             <div className="col-span-2 border-b border-(--gray-500) flex items-center justify-center p-6 bg-(--bg-white)">
//                 <h2 className="text-4xl font-semibold">Ready To Start? </h2>
//             </div>
//     </div>
//   )
// }

// export default NormalFooter


import React from "react";

export type HomeScreenFooterProps = {
  title?: string;
  ctaText?: string;
  onCtaClick?: () => void;
};

const HomeScreenFooter: React.FC<HomeScreenFooterProps> = ({
  title = "Ready To Start?",
  ctaText = "Get full access to Knowledge →",
  onCtaClick,
}) => {
  return (
      <section className="max-w-7xl mx-auto border-b border-(--gray-500)">

        {/* TOP GRID DECORATION (DESKTOP ONLY) */}
        <div className="hidden lg:grid grid-cols-4 border-b border-(--gray-500)">
          <div className="border-r border-(--gray-500) h-16" />
          <div className="border-r border-(--gray-500) h-16" />
          <div className="border-r border-(--gray-500) h-16" />
          <div className="h-16" />
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* CTA TEXT */}
          <div className="border-b md:border-b-0 md:border-r border-(--gray-500) p-6 flex items-center justify-center">
            <button
              onClick={onCtaClick}
              className="
                text-(--gray-500)
                font-semibold
                text-base sm:text-lg
                hover:text-(--primary-green)
                transition
              "
            >
              {ctaText}
            </button>
          </div>

          {/* TITLE */}
          <div className="p-6 bg-(--bg-white) flex items-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
              {title}
            </h2>
          </div>

        </div>
    </section>
  );
};

export default HomeScreenFooter;
