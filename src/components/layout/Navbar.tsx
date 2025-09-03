/**
 * Navigation Bar Component
 *
 * This component provides the main navigation for the entertainment app.
 * It displays a responsive sidebar with navigation icons and user avatar.
 *
 * Key features:
 * - Responsive design (mobile horizontal, desktop vertical)
 * - Active state management for navigation items
 * - Icon-based navigation with active/inactive states
 * - User avatar display
 * - Accessibility labels for screen readers
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";
import { useState } from "react";
import React from "react";

/**
 * Navigation items configuration
 * Each item has an ID, default icon, and active icon for visual feedback
 */
const navItems = [
  {
    id: "home",
    defaultIcon: "/images/icon-nav-home.svg",
    activeIcon: "/images/icon-nav-home-active.svg",
  },
  {
    id: "movies",
    defaultIcon: "/images/icon-nav-movies.svg",
    activeIcon: "/images/icon-nav-movies-active.svg",
  },
  {
    id: "tv-series",
    defaultIcon: "/images/icon-nav-tv-series.svg",
    activeIcon: "/images/icon-nav-tv-series-active.svg",
  },
  {
    id: "bookmarks",
    defaultIcon: "/images/icon-nav-bookmark.svg",
    activeIcon: "/images/icon-nav-bookmark-active.svg",
  },
];

/**
 * Navbar component that renders the main navigation
 * @returns JSX.Element - Navigation bar with icons and user avatar
 */
function Navbar() {
  // State to track which navigation item is currently active
  const [active, setActive] = useState("home");

  /**
   * Handles navigation item clicks and updates active state
   * @param id - The ID of the clicked navigation item
   */
  const handleClick = (id) => {
    setActive(id);
  };

  return (
    <nav className="relative bg-[#161d2f] px-4 py-4.5 xl:pt-[33px] flex xl:flex-col justify-between items-center xl:mb-8 md:rounded-[20px]">
      {/* Site logo - links to home page */}
      <Link onClick={() => setActive("home")} href="/" aria-label="Home">
        <Image
          className="w-[25px] h-[20px] md:w-8 md:h-[25px]"
          width={25}
          height={20}
          alt="site logo"
          src="/images/logo.svg"
        />
      </Link>

      {/* Spacer div for desktop layout */}
      <div className="xl:h-[72px] hidden xl:block"></div>

      {/* Navigation items list */}
      <ul className="flex gap-6 xl:gap-10 xl:flex-col xl:absolute xl:left-[38px] xl:top-[131px]">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.id !== "home" ? `/${item.id}` : "/"}
              aria-label={`/${item.id}`}
            >
              <Image
                onClick={() => handleClick(item.id)}
                className={`${item.id !== "bookmarks" ? "w-4 md:w-5" : "w-[13px] md:w-4"} h-4 md:h-5`}
                width={item.id !== "bookmarks" ? 16 : 13}
                height={16}
                alt={`${item.id} icon`}
                src={active === item.id ? item.activeIcon : item.defaultIcon}
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* User avatar - placeholder link for profile functionality */}
      <Link href="/public" aria-label="Home">
        <Image
          className="w-6 h-6 md:w-8 md:h-8"
          width={24}
          height={24}
          alt="profile avatar"
          src="/images/image-avatar.png"
        />
      </Link>
    </nav>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default React.memo(Navbar);
