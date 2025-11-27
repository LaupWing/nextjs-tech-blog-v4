# Content Creation Instructions

This guide explains how to create blog posts, library snippets, and project pages for your tech blog.

## Table of Contents

- [Blog Posts](#blog-posts)
- [Library Snippets](#library-snippets)
- [Projects](#projects)
- [Cloudinary Images](#cloudinary-images)
- [MDX Components](#mdx-components)

---

## Blog Posts

Blog posts are long-form articles located in `src/contents/blog/`.

### File Location

```
src/contents/blog/[slug].mdx
```

### Frontmatter

```mdx
---
title: "Your Blog Post Title"
description: "A brief description of your blog post (used for SEO and previews)"
publishedAt: "2025-01-15"
lastUpdated: "2025-01-20"
banner: "techblog/your_banner_image"
tags: "react,typescript,nextjs"
---
```

| Field         | Required | Description                                        |
| ------------- | -------- | -------------------------------------------------- |
| title         | Yes      | The title of your blog post                        |
| description   | Yes      | Short description for SEO and card previews        |
| publishedAt   | Yes      | Publication date (YYYY-MM-DD)                      |
| lastUpdated   | No       | Last update date (YYYY-MM-DD)                      |
| banner        | Yes      | Cloudinary public ID for the banner image          |
| tags          | Yes      | Comma-separated tags (used for filtering/tech icons) |

### Example Blog Post

```mdx
---
title: "Understanding React Server Components"
description: "A deep dive into React Server Components and how they change the way we build React apps"
publishedAt: "2025-01-15"
banner: "techblog/react_server_components"
tags: "react,nextjs,typescript"
---

> ## Introduction

Your introduction text here...

> ## Main Content

Your main content here...

<CloudinaryImage
    mdx
    public_id="techblog/your_image"
    alt="Description of image"
    width={1424}
    height={812}
/>

> ## Conclusion

Your conclusion here...
```

---

## Library Snippets

Library snippets are short code references located in `src/contents/library/`.

### File Location

```
src/contents/library/[slug].mdx
```

### Frontmatter

```mdx
---
title: "Your Snippet Title"
description: "Brief description of the snippet"
publishedAt: "2025-01-15"
tags: "react,typescript"
---
```

| Field       | Required | Description                                 |
| ----------- | -------- | ------------------------------------------- |
| title       | Yes      | The title of your snippet                   |
| description | Yes      | Short description                           |
| publishedAt | Yes      | Publication date (YYYY-MM-DD)               |
| tags        | Yes      | Comma-separated tags (for filtering/icons)  |

### Example Library Snippet

```mdx
---
title: "TypeScript Query Selector"
description: "Type-safe query selector helper for TypeScript"
publishedAt: "2025-01-15"
tags: "typescript,javascript"
---

> ## The Problem

Explanation of the problem...

> ## The Solution

\`\`\`typescript
function querySelector<T extends HTMLElement>(
    selector: string
): T | null {
    return document.querySelector<T>(selector);
}
\`\`\`

> ## Usage

\`\`\`typescript
const button = querySelector<HTMLButtonElement>(".btn");
\`\`\`
```

---

## Projects

Project pages showcase your work and are located in `src/contents/projects/`.

### File Location

```
src/contents/projects/[slug].mdx
```

### Frontmatter

```mdx
---
title: "Project Name"
description: "Brief description of your project"
publishedAt: "2025-01-15"
techs: "react,nextjs,tailwindcss,typescript"
banner: "techblog/project_folder/hero"
github: "https://github.com/username/repo"
link: "https://your-live-site.com"
---
```

| Field       | Required | Description                                    |
| ----------- | -------- | ---------------------------------------------- |
| title       | Yes      | Project name                                   |
| description | Yes      | Short description for SEO and cards            |
| publishedAt | Yes      | Publication date (YYYY-MM-DD)                  |
| techs       | Yes      | Comma-separated tech stack (for icons)         |
| banner      | Yes      | Cloudinary public ID for banner image          |
| github      | No       | GitHub repository URL                          |
| link        | No       | Live demo URL                                  |

### Project Structure Template

```mdx
---
title: "Project Name"
description: "Brief description"
publishedAt: "2025-01-15"
techs: "react,nextjs,tailwindcss"
banner: "techblog/project_name/hero"
github: "https://github.com/username/repo"
link: "https://live-site.com"
---

> ## Short Explanation

Brief overview of the project. What is it? What problem does it solve?

You can view the live demo at <CustomLink href="https://live-site.com">live-site.com</CustomLink>.

> ## Project Goals

- **Goal 1**: Description
- **Goal 2**: Description
- **Goal 3**: Description

<blockquote className="with-icons">
    ## Tech Stack Used
    <div className="not-prose mt-2">
        <TechIcons techs={["react", "nextjs", "tailwindcss", "typescript"]} />
    </div>
</blockquote>

Description of the tech stack and why you chose it...

> ## App Explanation & Screenshots

### Feature 1

Description of this feature...

<CloudinaryImage
    mdx
    public_id="techblog/project_name/feature1"
    alt="Feature 1 Screenshot"
    width={1424}
    height={812}
/>

### Feature 2

Description of this feature...

<CloudinaryImage
    mdx
    public_id="techblog/project_name/feature2"
    alt="Feature 2 Screenshot"
    width={1424}
    height={812}
/>

> ## Lessons Learned

- **Lesson 1**: What you learned
- **Lesson 2**: What you learned
- **Lesson 3**: What you learned
```

---

## Cloudinary Images

### Folder Structure

Organize your images in Cloudinary with this structure:

```
techblog/
├── blog_post_banner.png
├── another_blog_banner.png
├── project_name/
│   ├── hero.png
│   ├── feature1.png
│   ├── feature2.png
│   └── screenshot.png
└── another_project/
    ├── hero.png
    └── demo.png
```

### Uploading Images

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Navigate to **Media Library**
3. Open or create the `techblog` folder
4. For projects, create a subfolder (e.g., `techblog/project_name/`)
5. Upload your images
6. Note the **public ID** (e.g., `techblog/project_name/hero`)

### Recommended Image Sizes

| Use Case      | Dimensions    | Aspect Ratio |
| ------------- | ------------- | ------------ |
| Blog Banner   | 1200 x 630    | ~1.9:1       |
| Project Hero  | 1424 x 812    | ~1.75:1      |
| Screenshots   | 1424 x 812    | ~1.75:1      |
| OG Images     | 1200 x 630    | 1.9:1        |

### Using Images in MDX

```mdx
<CloudinaryImage
    mdx
    public_id="techblog/your_image_id"
    alt="Descriptive alt text"
    width={1424}
    height={812}
/>
```

---

## MDX Components

These components are available in all MDX files:

### CloudinaryImage

Display images from Cloudinary:

```mdx
<CloudinaryImage
    mdx
    public_id="techblog/image_id"
    alt="Alt text"
    width={1424}
    height={812}
/>
```

### TechIcons

Display technology icons:

```mdx
<TechIcons techs={["react", "nextjs", "typescript", "tailwindcss"]} />
```

Available tech icons:
- `react`, `nextjs`, `vue`, `gatsby`
- `typescript`, `javascript`
- `tailwindcss`, `css`
- `nodejs`, `php`, `laravel`
- `firebase`, `mongodb`, `mysql`
- `wordpress`, `shopify`
- `git`, `redux`, `solidity`
- `googleadk`

### CustomLink

External links with styling:

```mdx
<CustomLink href="https://example.com">Link Text</CustomLink>
```

### Blockquote with Icons

For tech stack sections:

```mdx
<blockquote className="with-icons">
    ## Tech Stack Used
    <div className="not-prose mt-2">
        <TechIcons techs={["react", "typescript"]} />
    </div>
</blockquote>
```

### Code Blocks

Syntax highlighted code:

````mdx
```typescript
const greeting: string = "Hello, World!";
console.log(greeting);
```
````

---

## Quick Checklist

### New Blog Post

- [ ] Create file: `src/contents/blog/[slug].mdx`
- [ ] Add frontmatter (title, description, publishedAt, banner, tags)
- [ ] Upload banner image to Cloudinary (`techblog/banner_name`)
- [ ] Write content with `> ##` section headers
- [ ] Add any screenshots with `<CloudinaryImage />`

### New Library Snippet

- [ ] Create file: `src/contents/library/[slug].mdx`
- [ ] Add frontmatter (title, description, publishedAt, tags)
- [ ] Write content with code examples

### New Project

- [ ] Create file: `src/contents/projects/[slug].mdx`
- [ ] Add frontmatter (title, description, publishedAt, techs, banner, github, link)
- [ ] Create Cloudinary folder: `techblog/project_name/`
- [ ] Upload images (hero, screenshots)
- [ ] Write sections: Short Explanation, Project Goals, Tech Stack, Screenshots, Lessons Learned

---

## File Naming Conventions

- Use **snake_case** for file names: `my_blog_post.mdx`
- Use **snake_case** for Cloudinary image IDs: `techblog/project_name/hero`
- Keep slugs URL-friendly (no spaces, special characters)
