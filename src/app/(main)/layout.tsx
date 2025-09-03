/**
 * Main Layout Component
 *
 * This layout wraps all authenticated pages in the application (home, movies, tv-series, bookmarks).
 * It provides authentication protection, navigation, and the main app structure.
 *
 * Key features:
 * - Authentication guard - redirects unauthenticated users to login
 * - Responsive layout with sidebar navigation
 * - React Query provider for data fetching
 * - Loading states while checking authentication
 */

"use client";

import Navbar from "@/components/layout/Navbar";
import { ReactQueryProvider } from "@/lib/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

/**
 * MainLayout component that provides the authenticated app structure
 * @param children - React components to render in the main content area
 * @returns JSX.Element - The main app layout with navigation and content
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current authentication session and status
  const { data: session, status } = useSession();

  // Effect hook to handle authentication protection
  useEffect(() => {
    // Don't redirect while still loading authentication status
    if (status === "loading") return;

    // If user is not authenticated, redirect to login page
    if (!session) {
      redirect("/login");
    }
  }, [session, status]);

  // Show loading screen while checking authentication status
  if (status === "loading") {
    return (
      <div className="h-screen bg-[#10141e] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Return null if not authenticated (will redirect to login)
  if (!session) {
    return null; // Will redirect to login
  }

  // Main authenticated app layout
  return (
    <ReactQueryProvider>
      {/* 
        Responsive layout structure:
        - Mobile: Full width with padding
        - Desktop: Sidebar + main content with grid layout
        - Extra large: Additional padding and gap adjustments
      */}
      <div className="h-screen md:p-6 xl:px-8 xl:pb-0 xl:grid xl:grid-cols-[96px_1fr] xl:gap-[36px]">
        {/* Navigation sidebar - fixed width on desktop */}
        <Navbar />
        {/* Main content area with scrollable overflow */}
        <main className="overflow-y-auto">{children}</main>
      </div>
    </ReactQueryProvider>
  );
}
