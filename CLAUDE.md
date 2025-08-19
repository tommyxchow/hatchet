# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


## Development Commands

- **Development server**: `pnpm dev` (uses Next.js with Turbopack for fast development)
- **Build**: `pnpm build` (creates production build)
- **Start production**: `pnpm start` (serves production build)
- **Lint**: `pnpm lint` (runs Next.js ESLint)
- **Format**: `pnpm format` (formats code with Prettier)
- **Clean**: `pnpm clean` (removes .next and node_modules)
- **Nuke**: `pnpm nuke` (removes .next, node_modules, and pnpm-lock.yaml)

## Architecture

This is a Next.js 15 App Router application that serves as a modern Hacker News client.

### Core Structure
- **Data Layer**: `src/lib/hnClient.ts` contains the Hacker News API client with functions for fetching items, users, and stories by feed type
- **Type Definitions**: `src/lib/types.ts` defines Zod schemas for HNItem, HNUser, HNComment, and feed types
- **UI Components**: Organized in `src/components/ui/` with components like StoryTile, StoryList, Header, Footer
- **App Routes**: Uses App Router with dynamic routes in `src/app/[slug]/` for different feed types and `src/app/item/` for individual stories

### Key Technologies
- **State Management**: TanStack Query for server state and caching
- **Styling**: Tailwind CSS with tailwind-merge for conditional classes
- **Theme**: next-themes for dark/light mode switching
- **Validation**: Zod for runtime type validation of API responses
- **Fonts**: Host Grotesk (sans) and JetBrains Mono (mono) from Google Fonts

### Data Flow
1. Feed pages (`[slug]/page.tsx`) fetch story IDs from HN API based on feed type
2. Stories are fetched in batches of 30 with pagination support
3. TanStack Query handles caching and background updates
4. Individual items and user profiles are fetched on-demand

### Configuration
- TypeScript path mapping: `@/*` maps to `src/*`
- ESLint config uses flat config format with TypeScript, Next.js, and accessibility rules
- Edge runtime enabled for better performance
- 60-second revalidation for story lists

BEFORE YOU FINISH EDITING/MAKING CHANGES: ALWAYS run format and lint to verify and double check for any broken changes or final fixes needed.
