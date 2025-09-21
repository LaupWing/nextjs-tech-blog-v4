import type { Metadata } from "next"
// import { BlogsContainer } from "@/components/containers/BlogsContainer.client"

import { getAllFilesFrontmatter } from "@/lib/mdx"
import seo from "@/lib/seo"
import { attachContentMeta } from "@/lib/helper"
import { Accent } from "@/components/Accent"

export const revalidate = 60

const fetchBlogs = async () => {
    const blogs = await getAllFilesFrontmatter("blog")

    return await attachContentMeta<"blog">(blogs)
}

export const metadata: Metadata = {
    ...seo({
        as_path: "blog",
        title: "Blog Page",
        description:
            "Everything you related to web development regarding the technologies often used nowadays. Each week minimal 1 blog!",
    }),
}

const Blog = async () => {
    // const posts = await fetchBlogs()

    return (
        <main>
            <section className="container py-12">
                <h1
                    className="text-3xl font-semibold md:text-5xl"
                    data-fade="0"
                >
                    <Accent>Blog</Accent>
                </h1>
                <p
                    className="mt-2 text-gray-600 dark:text-gray-300"
                    data-fade="1"
                >
                    Interesting tech findings.
                </p>
                {/* @ts-ignore */}
                {/* <BlogsContainer posts={posts} /> */}
            </section>
        </main>
    )
}
export default Blog
