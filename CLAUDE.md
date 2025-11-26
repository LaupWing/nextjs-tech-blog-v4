# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
```

### Prisma

```bash
npx prisma migrate dev --name <migration-name>  # Create and apply migration
npx prisma studio                                # Open database GUI
npx prisma generate                              # Regenerate Prisma client
```

## Architecture

This is a Next.js 15 tech blog with MDX content, using the App Router and React 19.

### Content System

- **MDX files** in `src/contents/{blog,library,projects}/` define all content
- `src/lib/mdx.ts` handles MDX bundling with rehype/remark plugins (prism syntax highlighting, slug generation, GFM)
- Content types defined in `src/types/frontmatters.ts`: `BlogFrontmatter`, `LibraryFrontmatter`, `ProjectFrontmatter`
- Frontmatter includes: title, description, publishedAt, tags, banner (Cloudinary ID)

### Database (Prisma + PostgreSQL)

Schema in `prisma/schema.prisma`:
- `ContentMeta`: Links content slugs to views/likes
- `View`/`Like`: Track per-session engagement
- `Contact`/`Subscriber`: Form submissions

Prisma client at `src/lib/prisma.ts`.

### API Routes

- `GET /api/views?slug=` - Get view count
- `POST /api/views/[slug]` - Increment views
- `GET /api/likes?slug=` - Get like count
- `GET /api/likes/user?slug=` - Check user's like status

### Component Conventions

- Client components use `.client.tsx` suffix
- MDX components registered in `src/components/MDXComponents.tsx`
- UI primitives in `src/components/ui/` (Radix-based)
- Images use Cloudinary via `CloudinaryImage.client.tsx`

### Path Aliases

`@/*` maps to `./src/*`
