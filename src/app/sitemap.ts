import { MetadataRoute } from "next"
import { getFiles } from "@/lib/mdx"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.SITE_URL || "https://loc-nguyen.com"

    const blogSlugs = await getFiles("blog")
    const projectSlugs = await getFiles("projects")
    const librarySlugs = await getFiles("library")

    const blogUrls = blogSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug.replace(/\.mdx$/, "")}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }))

    const projectUrls = projectSlugs.map((slug) => ({
        url: `${baseUrl}/projects/${slug.replace(/\.mdx$/, "")}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }))

    const libraryUrls = librarySlugs.map((slug) => ({
        url: `${baseUrl}/library/${slug.replace(/\.mdx$/, "")}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/library`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.4,
        },
        ...blogUrls,
        ...projectUrls,
        ...libraryUrls,
    ]
}
