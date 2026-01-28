"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/providers";

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (route: string) => pathname.startsWith(route);

  return (
    <>
      <nav className="hidden md:grid max-w-7xl mx-auto border-b border-x border-(--gray-500) grid-cols-4">

        <Link
          href="/"
          className="flex text-xl items-center gap-2 col-span-1 border-r border-(--gray-500) p-2"
        >
          <span className="text-(--primary-dark) font-bold">Learing</span>
          <span className="text-(--gray-700)">Online</span>
        </Link>

        {/* Center Menu */}
        <ul className="hidden lg:flex items-center justify-center gap-8 text-(--gray-700) col-span-2 p-2 border-r border-(--gray-500)">

          {/* Tracks */}
          <li>
            <Link
              href="/tracks"
              className={`hover:text-(--primary-dark) ${isActive("/tracks") ? "text-(--primary-dark) text-lg font-semibold" : ""
                }`}
            >
              Tracks
            </Link>
          </li>

          {/* Courses */}
          <li>
            <Link
              href="/courses"
              className={`hover:text-(--primary-dark) ${isActive("/courses") ? "text-(--primary-dark) text-lg font-semibold" : ""
                }`}
            >
              Courses
            </Link>
          </li>

          {/* Blog */}
          <li>
            <Link
              href="/blog"
              className={`hover:text-(--primary-dark) ${isActive("/blog") ? "text-(--primary-dark) text-lg font-semibold" : ""
                }`}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/forum"
              className={`hover:text-(--primary-dark) ${isActive("/forum") ? "text-(--primary-dark) text-lg font-semibold" : ""
                }`}
            >
              Forum
            </Link>
          </li>

          {user ? (
            <li>
              <Link
                href="/profile"
                className={`hover:text-(--primary-dark) ${isActive("/profile")
                  ? "text-(--primary-dark) text-lg font-semibold"
                  : ""
                  }`}
              >
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                className={`hover:text-(--primary-dark) ${isActive("/login")
                  ? "text-(--primary-dark) text-lg font-semibold"
                  : ""
                  }`}
              >
                Sign In →
              </Link>
            </li>
          )}



        </ul>

        {/* Search */}
        <div className="p-2">
          <SearchBar />
        </div>
      </nav>

      {/* MOBILE NAVBAR (< md) */}
      <nav className="md:hidden border-b border-(--gray-500) px-4 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">

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
        <div className="md:hidden border-b border-(--gray-500) bg-white px-4 py-4 w-full space-y-4 text-(--gray-800) max-w-7xl mx-auto">

          <Link
            href="/tracks"
            className={`block ${isActive("/tracks") ? "text-(--primary-dark) text-lg font-semibold" : ""
              }`}
          >
            Tracks
          </Link>

          <Link
            href="/courses"
            className={`block ${isActive("/courses") ? "text-(--primary-dark) text-lg font-semibold" : ""
              }`}
          >
            Courses
          </Link>

          <Link
            href="/blog"
            className={`block ${isActive("/blog") ? "text-(--primary-dark) text-lg font-semibold" : ""
              }`}
          >
            Blog
          </Link>

          <Link
            href="/forum"
            className={`block ${isActive("/forum") ? "text-(--primary-dark) text-lg font-semibold" : ""
              }`}
          >
            Forum
          </Link>

          {user ? (
            <Link
              href="/profile"
              className={`block ${isActive("/profile")
                  ? "text-(--primary-dark) text-lg font-semibold"
                  : ""
                }`}
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className={`block ${isActive("/login")
                  ? "text-(--primary-dark) text-lg font-semibold"
                  : ""
                }`}
            >
              Sign In →
            </Link>
          )}


          <div className="pt-2">
            <SearchBar />
          </div>
        </div>
      )}
    </>
  );
}
