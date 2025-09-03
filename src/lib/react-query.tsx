/**
 * React Query Configuration and Provider
 *
 * This file sets up React Query (TanStack Query) for data fetching and caching.
 * React Query is a powerful library that handles server state management,
 * caching, background updates, and synchronization.
 *
 * Key features configured:
 * - Optimized caching strategies
 * - Background refetching
 * - Error handling and retries
 * - Development tools for debugging
 */

"use client";

import { QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * QueryClient instance with custom configuration
 * This client manages all queries and mutations in the application
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable automatic refetching on window focus to improve UX
      refetchOnWindowFocus: false,
      // Disable refetching when component mounts if data exists
      refetchOnMount: false,
      // Disable refetching when network reconnects
      refetchOnReconnect: false,
      // Retry failed requests only once
      retry: 1,
      // Data is considered fresh for 5 minutes
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Keep unused data in cache for 30 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    },
  },
});

/**
 * ReactQueryProvider component that wraps the app with React Query context
 * @param children - React components that need access to React Query
 * @returns JSX.Element - App wrapped with QueryClientProvider and DevTools
 */
export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 
        React Query DevTools for development debugging
        Provides a UI to inspect queries, mutations, and cache state
        Only visible in development mode
      */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
