/**
 * Root Layout Component
 *
 * This is the top-level layout that wraps all pages in the application.
 * It provides the HTML structure, global styles, and context providers.
 *
 * Key responsibilities:
 * - Set up the HTML document structure
 * - Apply global CSS styles
 * - Provide authentication context to all child components
 * - Define the base page layout and styling
 */

import "./globals.css";
import React from "react";
import Providers from "@/components/Providers";

/**
 * RootLayout component that wraps all pages
 * @param children - React components to render inside the layout
 * @returns JSX.Element - The complete HTML structure with providers
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 
        Body element with dark theme background color
        The Providers component wraps all children to provide authentication context
      */}
      <body className="bg-[#10141e]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
