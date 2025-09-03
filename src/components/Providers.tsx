/**
 * Providers Component
 *
 * This component wraps the entire application with necessary context providers.
 * It's a client component that provides authentication context to all child components.
 *
 * Context providers are essential for sharing state across the component tree
 * without prop drilling. In this case, we're providing NextAuth session data
 * to all components in the app.
 */

"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Providers component that wraps children with authentication context
 * @param children - React components that need access to authentication context
 * @returns JSX.Element - Children wrapped with SessionProvider
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // SessionProvider makes authentication state available throughout the app
  // This allows any component to use useSession() hook to access user data
  return <SessionProvider>{children}</SessionProvider>;
}
