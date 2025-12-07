import type { FC } from "react"
import type { ProjectFrontmatter } from "@/types/frontmatters"
import type { Metadata } from "next"

import { IconGithub, IconLink } from "@/components/Icons"
import { getFileBySlug, getFiles } from "@/lib/mdx"
import seo from "@/lib/seo"
import { TechIcons, TechListType } from "@/components/TechIcons.client"
import { Content } from "@/components/Content"
import { TableContents } from "@/components/TableContents.client"
import { Likes } from "@/components/Likes.client"
import { CloudinaryImage } from "@/components/CloudinaryImage.client"
import { Views } from "@/components/Views.client"
import { CustomLink } from "@/components/CustomLink"
import { ViewTracker } from "@/components/ViewTracker.client"

export const dynamicParams = false
export let revalidate = 0

const fetchProject = async (slug: string) => {
    const post = await getFileBySlug("projects", slug)

    return post as {
        content: string
        frontmatter: ProjectFrontmatter
    }
}

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const slug = (await props.params).slug
    const post = await fetchProject(slug)
    const { frontmatter } = post

    const OG_BANNER_LINK = `https://res.cloudinary.com/laupwing/image/upload/f_auto,c_fill,ar_12:8,w_1200/${frontmatter.banner}`

    return {
        ...seo({
            banner: OG_BANNER_LINK,
            template_title: frontmatter.title,
            title: frontmatter.title,
            description: frontmatter.description,
            as_path: `projects/${slug}`,
        }),
    }
}

const SingleProjectPage = async (props: PageProps) => {
    const { frontmatter, content } = await fetchProject((await props.params).slug)

    return (
        <section className="container mt-6">
            <ViewTracker slug={frontmatter.slug} />
            <Hero frontmatter={frontmatter} slug={frontmatter.slug} />
            <hr className="mt-4 dark:border-gray-600" />
            <section className="lg:grid pt-4 pb-8 lg:grid-cols-[auto_250px] lg:gap-8">
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
        </section>
    )
}
export default SingleProjectPage

export async function generateStaticParams() {
    const posts = await getFiles("projects")

    return posts.map((p) => ({
        slug: p.replace(/\.mdx/, ""),
    }))
}

interface HeroProps {
    frontmatter: ProjectFrontmatter
    slug: string
}

const Hero: FC<HeroProps> = ({ frontmatter, slug }) => {
    return (
        <div>
            <div className="relative">
                <CloudinaryImage
                    public_id={frontmatter.banner}
                    alt={frontmatter.title}
                    width={1440}
                    height={750}
                />
                <div className="absolute bottom-4 left-4 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                    <TechIcons
                        techs={frontmatter.techs.split(",") as Array<TechListType>}
                        hoverGradient
                    />
                </div>
            </div>
            <h1 className="mt-4 dark:text-light text-2xl font-bold md:text-4xl">{frontmatter.title}</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {frontmatter.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                <Views slug={slug} />

                {(frontmatter.github || frontmatter.link) && " - "}
                {frontmatter.github && (
                    <div className="inline-flex items-center gap-2">
                        <IconGithub className="text-lg text-gray-800 dark:text-light" />
                        <CustomLink href={frontmatter.github} className="mt-1">
                            Repository
                        </CustomLink>
                    </div>
                )}
                {frontmatter.link && (
                    <div className="inline-flex items-center gap-2">
                        <IconLink className="text-lg text-gray-800 dark:text-light" />
                        <CustomLink href={frontmatter.link} className="mt-1">
                            Open Live Site
                        </CustomLink>
                    </div>
                )}
            </div>
        </div>
    )
}
