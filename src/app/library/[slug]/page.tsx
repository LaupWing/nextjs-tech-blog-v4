import type { FC } from "react"
import type { TechListType } from "@/components/TechIcons.client"
import { TechIcons } from "@/components/TechIcons.client"
import { getFileBySlug, getFiles } from "@/lib/mdx"
import { LibraryFrontmatter } from "@/types/frontmatters"
import { Metadata } from "next"
import seo from "@/lib/seo"
import { Views } from "@/components/Views.client"
import { LibrarySection } from "./LibrarySection"

export const dynamicParams = false

export let revalidate = 0

export async function generateStaticParams() {
    const posts = await getFiles("library")

    return posts.map((p) => ({
        slug: p.replace(/\.mdx/, ""),
    }))
}

const fetchPost = async (slug: string) => {
    const post = await getFileBySlug("library", slug)
    return post as {
        code: string
        frontmatter: LibraryFrontmatter
    }
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { slug } = await props.params
    const post = await fetchPost(slug)
    const { frontmatter } = post

    return {
        ...seo({
            title: frontmatter.title,
            description: frontmatter.description,
            banner: `${process.env.API_URL}/og/gradient?title=${frontmatter.title}&description=${frontmatter.description}`,
        }),
    }
}

interface PageProps {
    params: Promise<{ slug: string }>
}

const SingleLibraryPage = async (props: PageProps) => {
    const { slug } = await props.params
    const post = await fetchPost(slug)
    const { frontmatter, code } = post
    return (
        <main className="container mt-6">
            <Hero frontmatter={frontmatter} />
            <hr className="dark:border-gray-600" />
            <LibrarySection code={code} slug={frontmatter.slug} />
        </main>
    )
}
export default SingleLibraryPage

interface HeroProps {
    frontmatter: LibraryFrontmatter
}

const Hero: FC<HeroProps> = ({ frontmatter }) => {
    return (
        <div className="border-b pb-4 dark:border-gray-600">
            <h1 className="dark:text-white">{frontmatter.title}</h1>
            <p className="mt-2 text-sm border-gray-600 dark:text-gray-300">
                {frontmatter.description}
            </p>
            <div className="mt-2 flex items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                <Views slug={frontmatter.slug} />
                <span>•</span>
                <TechIcons
                    techs={frontmatter.tags.split(",") as Array<TechListType>}
                />
            </div>
        </div>
    )
}
