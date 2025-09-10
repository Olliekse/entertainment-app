/**
 * NextAuth Configuration
 *
 * This file configures NextAuth.js for user authentication in the entertainment app.
 * It sets up credential-based authentication with email/password login.
 *
 * Key features:
 * - Email/password authentication using credentials provider
 * - Password hashing and verification with bcryptjs
 * - JWT-based sessions for stateless authentication
 * - Custom login page routing
 * - User data persistence in JWT tokens
 */

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./users";
import { compare } from "bcryptjs";

// Extend NextAuth types to include custom user properties
declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

/**
 * NextAuth configuration object
 * Defines authentication providers, session strategy, and callbacks
 */
export const authOptions: NextAuthOptions = {
  // Authentication providers - currently only credentials (email/password)
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Define the credential fields for the login form
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      /**
       * Authorization function that validates user credentials
       * @param credentials - User-provided email and password
       * @returns User object if valid, null if invalid
       */
      async authorize(credentials) {
        // Check if both email and password are provided
        if (!credentials?.email || !credentials?.password) return null;

        // Find user by email in the database
        const user = await getUserByEmail(credentials.email);
        if (!user) return null;

        // Compare provided password with hashed password in database
        const ok = await compare(credentials.password, user.passwordHash);
        if (!ok) return null;

        // Return user object (without password) for session
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  // Use JWT strategy for stateless sessions (no database queries needed)
  session: { strategy: "jwt" },
  // Custom pages configuration
  pages: {
    signIn: "/login", // Redirect to custom login page instead of default
  },
  // Callbacks for customizing JWT and session behavior
  callbacks: {
    /**
     * JWT callback - runs when JWT is created or updated
     * Used to add custom data to the JWT token
     */
    async jwt({ token, user }) {
      // Add user ID to token when user first logs in
      if (user) token.id = user.id;
      return token;
    },
    /**
     * Session callback - runs when session is checked
     * Used to add custom data to the session object
     */
    async session({ session, token }) {
      // Add user ID from token to session user object
      if (session.user && token?.id) session.user.id = token.id as string;
      return session;
    },
  },
};
