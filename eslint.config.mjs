/**
 * ESLint Configuration
 *
 * This file configures ESLint for code quality and consistency in the entertainment app.
 * It uses the new flat config format and extends Next.js recommended rules.
 *
 * Key features:
 * - Next.js core web vitals rules
 * - TypeScript-specific linting rules
 * - File exclusions for build artifacts
 * - Modern flat config format
 */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get current file path for ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create compatibility layer for legacy ESLint configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * ESLint configuration array
 * Extends Next.js recommended rules and adds custom configurations
 */
const eslintConfig = [
  // Extend Next.js core web vitals and TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Files and directories to ignore during linting
    ignores: [
      "node_modules/**", // Third-party dependencies
      ".next/**", // Next.js build output
      "out/**", // Static export output
      "build/**", // Build artifacts
      "next-env.d.ts", // Next.js type definitions
    ],
  },
];

export default eslintConfig;
