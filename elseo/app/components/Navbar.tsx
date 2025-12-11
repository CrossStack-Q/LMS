// import SearchBar from "./SearchBar";

// export default function Navbar() {
//   return (
//     <nav className="max-w-7xl mx-auto border-b-2 border-x-2 border-(--gray-500) grid grid-cols-4">
//       <div className="flex items-center gap-2 col-span-1 border-r-2 border-(--gray-500) p-6">
//         <span className="text-(--primary-dark) font-bold">Learing</span>
//         <span className="text-(--gray-700)">Online</span>
//       </div>

//       <ul className="hidden lg:flex items-center justify-center gap-8 text-(--gray-700) col-span-2 p-6 border-r-2 border-(--gray-500)">
//         <li>Tracks</li>
//         <li>Courses</li>
//         <li>Blog</li>
//         <li className="font-medium">Sign In →</li>
//       </ul>

// <div className="p-6">
//       <SearchBar/>
//       </div>
//     </nav>
//   );
// }


// "use client";

// import Link from "next/link";
// import SearchBar from "./SearchBar";
// import { useState } from "react";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* DESKTOP NAVBAR (md and up) */}
//       <nav className="hidden md:grid max-w-7xl mx-auto border-b-2 border-x-2 border-(--gray-500) grid-cols-4">
        
//         {/* Logo */}
//         <Link
//           href="/"
//           className="flex items-center gap-2 col-span-1 border-r-2 border-(--gray-500) p-2"
//         >
//           <span className="text-(--primary-dark) font-bold">Learing</span>
//           <span className="text-(--gray-700)">Online</span>
//         </Link>

//         {/* Center Menu */}
//         <ul className="hidden lg:flex items-center justify-center gap-8 text-(--gray-700) col-span-2 p-2 border-r-2 border-(--gray-500)">
//           <li>
//             <Link href="/tracks" className="hover:text-(--primary-dark)">
//             Tracks
//             </Link>
//             </li>

//           <li>
//             <Link href="/courses" className="hover:text-(--primary-dark)">
//               Courses
//             </Link>
//           </li>

//           <li>
//             <Link href="/blog" className="hover:text-(--primary-dark)">
//             Blog
//             </Link>
//             </li>
//           <li className="font-medium cursor-pointer">Sign In →</li>
//         </ul>

//         {/* Search */}
//         <div className="p-2">
//           <SearchBar />
//         </div>
//       </nav>

//       {/* MOBILE NAVBAR (< md) */}
//       <nav className="md:hidden border-b-2 border-(--gray-500) px-4 py-4 flex items-center justify-between max-w-7xl mx-auto">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <span className="text-(--primary-dark) font-bold">Learing</span>
//           <span className="text-(--gray-700)">Online</span>
//         </Link>

//         {/* Hamburger Button */}
//         <button
//           className="text-2xl"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>
//       </nav>

//       {/* MOBILE MENU DROPDOWN */}
//       {open && (
//         <div className="md:hidden border-b-2 border-(--gray-500) bg-white px-4 py-4 space-y-4 text-(--gray-800) max-w-7xl mx-auto">

//           <Link href="/tracks" className="block">
//             Tracks
//           </Link>

//           <Link href="/courses" className="block">
//             Courses
//           </Link>

//           <Link href="/blog" className="block">
//             Blog
//           </Link>

//           <button className="block font-medium">Sign In →</button>

//           <div className="pt-2">
//             <SearchBar />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }





"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // <-- current route

  // Helper: checks if route starts with a tab
  const isActive = (route: string) => pathname.startsWith(route);

  return (
    <>
      {/* DESKTOP NAVBAR (md and up) */}
      <nav className="hidden md:grid max-w-7xl mx-auto border-b-2 border-x-2 border-(--gray-500) grid-cols-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 col-span-1 border-r-2 border-(--gray-500) p-2"
        >
          <span className="text-(--primary-dark) font-bold">Learing</span>
          <span className="text-(--gray-700)">Online</span>
        </Link>

        {/* Center Menu */}
        <ul className="hidden lg:flex items-center justify-center gap-8 text-(--gray-700) col-span-2 p-2 border-r-2 border-(--gray-500)">
          
          {/* Tracks */}
          <li>
            <Link
              href="/tracks"
              className={`hover:text-(--primary-dark) ${
                isActive("/tracks") ? "text-(--primary-green) text-lg font-medium" : ""
              }`}
            >
              Tracks
            </Link>
          </li>

          {/* Courses */}
          <li>
            <Link
              href="/courses"
              className={`hover:text-(--primary-dark) ${
                isActive("/courses") ? "text-(--primary-green) text-lg font-medium" : ""
              }`}
            >
              Courses
            </Link>
          </li>

          {/* Blog */}
          <li>
            <Link
              href="/blog"
              className={`hover:text-(--primary-dark) ${
                isActive("/blog") ? "text-(--primary-green) text-lg font-medium" : ""
              }`}
            >
              Blog
            </Link>
          </li>

          <li className="font-medium cursor-pointer">Sign In →</li>
        </ul>

        {/* Search */}
        <div className="p-2">
          <SearchBar />
        </div>
      </nav>

      {/* MOBILE NAVBAR (< md) */}
      <nav className="md:hidden border-b-2 border-(--gray-500) px-4 py-4 flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-(--primary-dark) font-bold">Learing</span>
          <span className="text-(--gray-700)">Online</span>
        </Link>

        {/* Hamburger */}
        <button className="text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-b-2 border-(--gray-500) bg-white px-4 py-4 space-y-4 text-(--gray-800) max-w-7xl mx-auto">

          <Link
            href="/tracks"
            className={`block ${
              isActive("/tracks") ? "text-(--primary-green) text-lg font-medium" : ""
            }`}
          >
            Tracks
          </Link>

          <Link
            href="/courses"
            className={`block ${
              isActive("/courses") ? "text-(--primary-green) text-lg font-medium" : ""
            }`}
          >
            Courses
          </Link>

          <Link
            href="/blog"
            className={`block ${
              isActive("/blog") ? "text-(--primary-green) text-lg font-medium" : ""
            }`}
          >
            Blog
          </Link>

          <button className="block font-medium">Sign In →</button>

          <div className="pt-2">
            <SearchBar />
          </div>
        </div>
      )}
    </>
  );
}
