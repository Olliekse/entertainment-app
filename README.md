# Entertainment App

A modern entertainment application built with Next.js, featuring movie and TV series browsing, user authentication, and bookmarking functionality. This app provides a Netflix-like experience with trending content, search capabilities, and personalized bookmarking.

## Live site

https://entertainment-app-livid.vercel.app

## Features

- **User Authentication**: Secure login/signup with NextAuth.js and bcryptjs password hashing
- **Movie & TV Series Browsing**: Browse trending and recommended content with static data
- **Search Functionality**: Real-time search for movies and TV series using OMDB API
- **Bookmarking System**: Save your favorite content using Zustand state management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Data**: Fetches content from OMDB API for search results
- **Modern UI**: Dark theme with smooth animations and responsive grid layouts
- **Testing**: Comprehensive test suite with Jest and React Testing Library

## Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript 5
- **Authentication**: NextAuth.js v4 with JWT strategy
- **State Management**: Zustand for client state, TanStack Query for server state
- **Styling**: Tailwind CSS v4
- **Data Fetching**: TanStack Query (React Query) v5
- **Password Hashing**: bcryptjs v3
- **Testing**: Jest v30 with React Testing Library
- **Linting**: ESLint v9 with Next.js rules
- **External API**: OMDB API for movie/TV series data

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd entertainment-app
```

1. Install dependencies:

```bash
npm install
# or
yarn install
```

1. Set up environment variables:
   Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_OMDB_KEY=your_omdb_api_key
NEXT_PUBLIC_OMDB_URL=https://www.omdbapi.com
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

1. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```text
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── (main)/            # Main app pages (home, movies, tv-series, bookmarks)
│   ├── api/               # API routes (NextAuth)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page (redirects based on auth)
├── components/            # React components
│   ├── bookmarks/         # Bookmark-related components
│   ├── features/          # Feature-specific components (SearchBar, TrendingCarousel, etc.)
│   ├── layout/            # Layout components (Navbar)
│   ├── ui/                # Reusable UI components (MediaCard)
│   └── Providers.tsx      # Context providers
├── features/              # Feature-specific logic and hooks
│   ├── bookmarks/         # Bookmark state management (Zustand)
│   ├── movies/            # Movie-related hooks
│   ├── search-bar/        # Search functionality with debouncing
│   └── tv-series/         # TV series-related hooks
├── lib/                   # Utility libraries
│   ├── api.ts            # OMDB API functions
│   ├── auth.ts           # NextAuth configuration
│   ├── data.json         # Static movie/TV series data
│   ├── react-query.tsx   # TanStack Query setup
│   ├── types.ts          # TypeScript type definitions
│   └── users.ts          # User management utilities
└── utils/                 # Utility functions
    ├── formatters.ts     # Data formatting utilities
    └── queryUtils.ts     # Query-related utilities
```

## Authentication

The app uses NextAuth.js v4 with credentials provider and JWT strategy. User passwords are securely hashed using bcryptjs. The authentication system includes:

- Email/password login and signup
- JWT-based sessions for stateless authentication
- Password hashing and verification
- Custom login page routing
- Session persistence across browser refreshes

### Test Credentials

- Email: `test@example.com`
- Password: `password123`

## Testing

The app includes a comprehensive testing setup with:

- **Jest v30**: Test runner with jsdom environment
- **React Testing Library**: Component testing utilities
- **Coverage Reports**: Test coverage analysis
- **Test Files**: Located alongside components (e.g., `Component.test.tsx`)

### Running Tests

```bash
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
```

### Test Structure

Tests are organized alongside their respective components and features:

- Component tests: `src/components/**/*.test.tsx`
- Hook tests: `src/features/**/*.test.ts`
- Integration tests: Various test files throughout the codebase

## Data Sources

The app uses a hybrid approach for content data:

- **Static Data**: Trending and recommended content from `src/lib/data.json`
- **Dynamic Data**: Search results from OMDB API (Open Movie Database)
- **Bookmarks**: User-specific data stored in Zustand state management

### OMDB API Integration

The app integrates with OMDB API for:

- Movie and TV series search functionality
- Real-time content discovery
- Detailed content information by IMDB ID

## Design System

The app uses a dark theme with the following color palette:

- **Background**: `#10141e` (Dark blue-black)
- **Secondary Background**: `#161d2f` (Slightly lighter blue)
- **Accent**: `#fc4747` (Red accent color)
- **Text**: `#ffffff` (White text)
- **Typography**: Light font weights with responsive sizing

## Responsive Design

The app is built with a mobile-first approach and includes:

- Mobile: Single column layout
- Tablet: Enhanced spacing and typography
- Desktop: Sidebar navigation with grid layout

## Deployment

The easiest way to deploy this app is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Learning Resources

### Core Technologies

- [Next.js Documentation](https://nextjs.org/docs) - App Router, Server Components
- [NextAuth.js Documentation](https://next-auth.js.org) - Authentication strategies
- [TanStack Query Documentation](https://tanstack.com/query) - Server state management
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS
- [Zustand Documentation](https://zustand-demo.pmnd.rs/) - Client state management

### Testing Framework

- [Jest Documentation](https://jestjs.io/docs/getting-started) - Testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Component testing

### External APIs

- [OMDB API Documentation](http://www.omdbapi.com/) - Movie database API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
