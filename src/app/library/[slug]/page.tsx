import type { FC } from "react"
import type { TechListType } from "@/components/TechIcons.client"
import { TechIcons } from "@/components/TechIcons.client"
import { getFileBySlug, getFiles } from "@/lib/mdx"
import { LibraryFrontmatter } from "@/types/frontmatters"
import { Metadata } from "next"
import seo from "@/lib/seo"
import { Views } from "@/components/Views.client"
import { Content } from "@/components/Content"
import { TableContents } from "@/components/TableContents.client"
import { Likes } from "@/components/Likes.client"
import { ViewTracker } from "@/components/ViewTracker.client"

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
        content: string
        frontmatter: LibraryFrontmatter
    }
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { slug } = await props.params
    const post = await fetchPost(slug)
    const { frontmatter } = post

    const ogParams = new URLSearchParams({
        templateTitle: frontmatter.title,
        description: frontmatter.description,
        siteName: "Loc Nguyen",
        theme: "dark",
    })

    return {
        ...seo({
            title: frontmatter.title,
            description: frontmatter.description,
            template_title: frontmatter.title,
            as_path: `library/${slug}`,
            banner: `${process.env.SITE_URL}/api/og?${ogParams.toString()}`,
        }),
    }
}

interface PageProps {
    params: Promise<{ slug: string }>
}

const SingleLibraryPage = async (props: PageProps) => {
    const { slug } = await props.params
    const post = await fetchPost(slug)
    const { frontmatter, content } = post
    return (
        <main className="container mt-6">
            <ViewTracker slug={frontmatter.slug} />
            <Hero frontmatter={frontmatter} />
            <hr className="dark:border-gray-600" />
            <section className="lg:grid pt-4 pb-8 lg:grid-cols-[auto_250px] w-full lg:gap-8">
                <Content content={content} />
                <aside className="py-4">
                    <div className="sticky top-24">
                        <TableContents slug={frontmatter.slug} />
                        <div className="flex items-center justify-center py-8">
                            <Likes slug={frontmatter.slug} />
                        </div>
                    </div>
                </aside>
            </section>
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
