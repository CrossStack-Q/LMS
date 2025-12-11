// export default function TopicCard({
//   icon,
//   title,
//   desc,
// }: {
//   icon: string;
//   title: string;
//   desc: string;
// }) {
//   return (
//     <div
//       className="
//       relative group 
//       bg-white 
//       border border-[rgba(0,0,0,0.15)]
//       rounded-md 
//       p-6 
//       shadow-sm
//       hover:shadow-md 
//       transition-all 
//       cursor-pointer
//       overflow-hidden
//       "
//     >
//       {/* Icon */}
//       <div className="text-3xl">{icon}</div>

//       {/* Title */}
//       <h3 className="mt-4 text-lg font-semibold text-black">
//         {title}
//       </h3>

//       {/* Description */}
//       <p className="mt-2 text-[15px] text-[rgba(0,0,0,0.6)] leading-relaxed">
//         {desc}
//       </p>

//       {/* Hover bottom bar */}
//       <div
//         className="
//         absolute bottom-0 left-0 
//         w-full h-12 
//         bg-[var(--primary-green)] 
//         translate-y-12 group-hover:translate-y-0
//         transition-all duration-300
//         flex justify-center items-center
//         text-white text-xl font-semibold
//         "
//       >
//         →
//       </div>
//     </div>
//   );
// }



export default function TopicCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <article className="relative group bg-white border border-subtle rounded-md p-6 shadow-sm hover:shadow-md transition-colors duration-200 overflow-hidden">
      <div className="text-2xl">{icon}</div>

      <h3 className="mt-4 text-lg md:text-xl font-semibold text-(--gray-900)">
        {title}
      </h3>

      <p className="mt-3 text-sm text-(--gray-700) leading-relaxed">
        {desc}
      </p>

      {/* bottom green bar: hidden until hover, slides up */}
      <div className="absolute left-0 bottom-0 w-full h-12 bg-(--primary-green) translate-y-12 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center arrow-box text-white">
        →
      </div>
    </article>
  );
}
