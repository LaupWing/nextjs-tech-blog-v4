"use client"
import { Content } from "@/components/Content.client"
import { Likes } from "@/components/Likes.client"
import { TableContents } from "@/components/TableContents.client"
import { useIncrementViews } from "@/hooks/useIncrementViews"
import { FC } from "react"

interface LibrarySectionProps {
    code: string
    slug: string
}

export const LibrarySection: FC<LibrarySectionProps> = ({ code, slug }) => {
    useIncrementViews(slug, true)

    return (
        <section className="lg:grid pt-4 pb-8 lg:grid-cols-[auto_250px] w-full lg:gap-8">
            <Content code={code} />
            <aside className="py-4">
                <div className="sticky top-24">
                    <TableContents slug={slug} />
                    <div className="flex items-center justify-center py-8">
                        <Likes slug={slug} />
                    </div>
                </div>
            </aside>
        </section>
    )
}
