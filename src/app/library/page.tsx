import { getAllFilesFrontmatter } from "@/lib/mdx"
import { Metadata } from "next"
import seo from "@/lib/seo"
import { attachContentMeta } from "@/lib/helper"
import { Accent } from "@/components/Accent"
import { LibraryContainer } from "./LibraryContainer.client"

const fetchLibrary = async () => {
    const library = await getAllFilesFrontmatter("library")

    return await attachContentMeta<"library">(library)
}

export const metadata: Metadata = {
    ...seo({
        as_path: "library",
        title: "Library Page",
        description:
            "Here's a collection of code snippets from various technologies that I have used before. Feel free to make use of them!",
    }),
}

const Library = async () => {
    const posts = await fetchLibrary()

    return (
        <section className="container py-12">
            <h1 className="text-3xl font-bold md:text-5xl" data-fade="0">
                <Accent>Library</Accent>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
                Here's a collection of code snippets from various technologies
                that I have used before. Feel free to make use of them!
            </p>
            {/* @ts-ignore */}
            <LibraryContainer posts={posts} />
        </section>
    )
}
export default Library
