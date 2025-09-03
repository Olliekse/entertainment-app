/**
 * Root Page Component
 *
 * This is the entry point page that users see when they visit the root URL (/).
 * It handles authentication state and redirects users to the appropriate page:
 * - If authenticated: redirects to /home
 * - If not authenticated: redirects to /login
 *
 * This component uses client-side rendering ("use client") because it needs
 * to access browser APIs and React hooks for authentication state.
 */

"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

/**
 * RootPage component that handles initial routing based on authentication status
 * @returns JSX.Element - Loading screen while determining redirect
 */
export default function RootPage() {
  // Get current session and loading status from NextAuth
  const { data: session, status } = useSession();

  // Effect hook to handle redirects based on authentication status
  useEffect(() => {
    // Don't redirect while still loading authentication status
    if (status === "loading") return;

    // If user is authenticated, redirect to home page
    if (session) {
      redirect("/home");
    } else {
      // If user is not authenticated, redirect to login page
      redirect("/login");
    }
  }, [session, status]); // Re-run effect when session or status changes

  // Show loading screen while determining where to redirect
  return (
    <div className="h-screen bg-[#10141e] flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
}
