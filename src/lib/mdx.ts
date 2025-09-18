import { ContentType, Frontmatter, PickFrontmatter } from "@/types/frontmatters"
import { readdirSync, readFileSync } from "fs"
import matter from "gray-matter"
import { join } from "path"
import readingTime from "reading-time"

export async function getAllFilesFrontmatter<T extends ContentType>(type: T) {
    const files = readdirSync(join(process.cwd(), "src", "contents", type))

    return files.reduce((allPosts: Array<PickFrontmatter<T>>, postSlug) => {
        const source = readFileSync(
            join(process.cwd(), "src", "contents", type, postSlug),
            "utf8"
        )
        const { data } = matter(source)

        const res = [
            {
                ...(data as PickFrontmatter<T>),
                slug: postSlug.replace(".mdx", ""),
                readingTime: readingTime(source),
            },
            ...allPosts,
        ]
        return res
    }, [])
}

export function getRecent<T extends Frontmatter>(
    contents: Array<T>,
    limit = 4
) {
    const sorted_contents = contents.sort((a, b) => {
        return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
    })

    return sorted_contents.slice(0, limit)
}
