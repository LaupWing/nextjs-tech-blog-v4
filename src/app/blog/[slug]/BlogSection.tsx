"use client"
import { Content } from "@/components/Content.client"
import { Likes } from "@/components/Likes.client"
import { TableContents } from "@/components/TableContents.client"
import React, { FC } from "react"

export const BlogSection: FC<{
    code: string
    frontmatter: {
        slug: string
    }
}> = ({ code, frontmatter }) => {
    return (
        <section className="lg:grid pt-4 pb-8 lg:grid-cols-[auto_250px] lg:gap-8">
            <Content code={code} />
            <aside className="py-4">
                <div className="sticky top-24">
                    <TableContents slug={frontmatter.slug} />
                    <div className="flex items-center justify-center py-8">
                        <Likes slug={frontmatter.slug} />
                    </div>
                </div>
            </aside>
        </section>
    )
}
