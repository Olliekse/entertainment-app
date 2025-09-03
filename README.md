# Entertainment App

A modern entertainment application built with Next.js, featuring movie and TV series browsing, user authentication, and bookmarking functionality.

## Features

- **User Authentication**: Secure login/signup with NextAuth.js
- **Movie & TV Series Browsing**: Browse trending and recommended content
- **Search Functionality**: Search for movies and TV series
- **Bookmarking System**: Save your favorite content for later viewing
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Data**: Fetches content from OMDB API
- **Modern UI**: Dark theme with smooth animations

## Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript
- **Authentication**: NextAuth.js with JWT
- **State Management**: Zustand for client state, React Query for server state
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query)
- **Password Hashing**: bcryptjs
- **Linting**: ESLint with Next.js rules

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd entertainment-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_OMDB_KEY=your_omdb_api_key
NEXT_PUBLIC_OMDB_URL=https://www.omdbapi.com
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:

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

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── (main)/            # Main app pages (home, movies, tv-series, bookmarks)
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page (redirects based on auth)
├── components/            # React components
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components (Navbar)
│   ├── ui/                # Reusable UI components
│   └── Providers.tsx      # Context providers
├── lib/                   # Utility libraries
│   ├── api.ts            # API functions
│   ├── auth.ts           # NextAuth configuration
│   ├── react-query.tsx   # React Query setup
│   ├── types.ts          # TypeScript type definitions
│   └── users.ts          # User management utilities
└── features/             # Feature-specific logic
```

## Authentication

The app uses NextAuth.js with credentials provider. Test credentials:

- Email: `test@example.com`
- Password: `password123`

## Design System

The app uses a dark theme with the following color palette:

- Background: `#10141e`
- Secondary Background: `#161d2f`
- Accent: `#fc4747`
- Text: `#ffffff`

## Responsive Design

The app is built with a mobile-first approach and includes:

- Mobile: Single column layout
- Tablet: Enhanced spacing and typography
- Desktop: Sidebar navigation with grid layout

## Deployment

The easiest way to deploy this app is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [React Query Documentation](https://tanstack.com/query)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
