/**
 * User Management Utilities
 *
 * This file contains user-related types and functions for the entertainment app.
 * Currently uses an in-memory user store for demonstration purposes.
 * In a production app, this would typically connect to a database.
 *
 * Key features:
 * - User type definition
 * - In-memory user storage
 * - User lookup by email
 * - Pre-hashed test user password
 */

/**
 * User type definition for the application
 * Represents a user account with authentication data
 */
export type User = {
  id: string; // Unique user identifier
  name: string; // User's display name
  email: string; // User's email address (used for login)
  passwordHash: string; // Hashed password (never store plain text passwords!)
};

/**
 * In-memory user database
 * In production, this would be replaced with a real database connection
 * Currently contains a test user for development purposes
 */
const users: User[] = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    // Test password: "password123"
    // This hash was generated using bcrypt with salt rounds of 10
    passwordHash:
      "$2a$10$lvIIP7R2VZ3MGZ8hEwQG.uj.oW1fHmECa/EXUoJgP4lpxigrXbSP2",
  },
];

/**
 * Finds a user by their email address
 * @param email - The email address to search for
 * @returns Promise<User | null> - User object if found, null if not found
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  // Search through users array and return matching user or null
  return users.find((u) => u.email === email) ?? null;
}
