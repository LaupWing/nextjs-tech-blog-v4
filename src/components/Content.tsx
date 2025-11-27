import { MDXRemote } from "next-mdx-remote/rsc"
import { MDXComponents } from "./MDXComponents"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrism from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

interface ContentProps {
    content: string
}

export const Content = ({ content }: ContentProps) => {
    return (
        <article className="mdx xl:col-span-1 mt-4 projects prose mx-auto w-full transition-colors dark:prose-invert">
            <MDXRemote
                source={content}
                components={MDXComponents}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [
                            rehypeSlug,
                            rehypePrism,
                            [
                                rehypeAutolinkHeadings,
                                {
                                    properties: {
                                        className: ["hash-anchor"],
                                    },
                                },
                            ],
                        ],
                    },
                }}
            />
        </article>
    )
}
