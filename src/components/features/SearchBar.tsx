/**
 * Search Bar Component
 *
 * This component provides a search input field with an icon for filtering content.
 * It's used across different pages to search for movies, TV series, and other content.
 *
 * Key features:
 * - Search icon with consistent styling
 * - Controlled input with external state management
 * - Responsive design with different text sizes
 * - Transparent background to blend with app theme
 * - Customizable placeholder text
 */

"use client";

import Image from "next/image";

/**
 * SearchBar component for content filtering
 * @param searchTerm - Current search input value
 * @param setSearchTerm - Function to update search term
 * @param placeholderText - Placeholder text for the input field
 * @returns JSX.Element - Search bar with icon and input field
 */
export default function SearchBar({
  searchTerm,
  setSearchTerm,
  placeholderText,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  placeholderText: string;
}) {
  /**
   * Handles input change events and updates the search term
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center gap-4 md:gap-6 xl:gap-8 mt-[21px] md:mt-[35px] mb-[20px] md:mb-[28px] xl:mt-[35px] xl:mb-[35px] px-4 md:px-0">
      {/* Search icon */}
      <Image
        className="w-6 h-6 md:h-8 md:w-8"
        height={24}
        width={24}
        alt="search icon"
        src="/images/icon-search.svg"
      />
      {/* Search input field */}
      <input
        value={searchTerm}
        onChange={handleChange}
        className="w-full bg-transparent font-light text-[16px] md:placeholder:leading-[5.208333333333333%] md:placeholder:text-[24px] text-white placeholder:text-white placeholder:opacity-50 focus:outline-none md:text-2xl tracking-[0.5px] md:tracking-[1px] placeholder:tracking-normal"
        placeholder={placeholderText}
      />
    </div>
  );
}
