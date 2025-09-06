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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* 
        Body element with dark theme background color
        The Providers component wraps all children to provide authentication context
      */}
      <body className="bg-[#10141e] font-outfit">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
