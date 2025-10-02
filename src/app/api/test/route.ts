// app/api/test/route.ts (or pages/api/test.ts for Pages Router)

import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import contentMetaData from "./ContentMeta.json"
import likeData from "./Like.json"
import viewData from "./View.json"

const prisma = new PrismaClient()

export async function GET() {
    try {
        // Step 1: Create a mapping of old ContentMeta IDs to slugs
        const oldIdToSlugMap = new Map<number, string>()
        contentMetaData.forEach((item) => {
            oldIdToSlugMap.set(item.id, item.slug)
        })

        // Step 2: Upsert all ContentMeta entries and create slug to new ID mapping
        const slugToNewIdMap = new Map<string, number>()

        for (const meta of contentMetaData) {
            const upserted = await prisma.contentMeta.upsert({
                where: { slug: meta.slug },
                update: {
                    createdAt: new Date(meta.createdAt),
                },
                create: {
                    slug: meta.slug,
                    createdAt: new Date(meta.createdAt),
                },
            })
            slugToNewIdMap.set(meta.slug, upserted.id)
        }

        console.log(`Upserted ${contentMetaData.length} ContentMeta entries`)

        // Step 3: Migrate Views
        let viewsCreated = 0
        let viewsSkipped = 0

        for (const view of viewData) {
            if (view.content_meta_id) {
                const slug = oldIdToSlugMap.get(view.content_meta_id)

                if (slug) {
                    const newContentMetaId = slugToNewIdMap.get(slug)

                    if (newContentMetaId) {
                        await prisma.view.create({
                            data: {
                                createdAt: new Date(view.createdAt),
                                session_id: view.session_id,
                                content_meta_id: newContentMetaId,
                            },
                        })
                        viewsCreated++
                    } else {
                        console.warn(
                            `Slug ${slug} not found in new database for view ${view.id}`
                        )
                        viewsSkipped++
                    }
                } else {
                    console.warn(
                        `Old content_meta_id ${view.content_meta_id} not found for view ${view.id}`
                    )
                    viewsSkipped++
                }
            } else {
                // Handle views without content_meta_id
                await prisma.view.create({
                    data: {
                        createdAt: new Date(view.createdAt),
                        session_id: view.session_id,
                        content_meta_id: null,
                    },
                })
                viewsCreated++
            }
        }

        console.log(`Created ${viewsCreated} views, skipped ${viewsSkipped}`)

        // Step 4: Migrate Likes
        let likesCreated = 0
        let likesSkipped = 0

        for (const like of likeData) {
            if (like.content_meta_id) {
                const slug = oldIdToSlugMap.get(like.content_meta_id)

                if (slug) {
                    const newContentMetaId = slugToNewIdMap.get(slug)

                    if (newContentMetaId) {
                        await prisma.like.create({
                            data: {
                                createdAt: new Date(like.createdAt),
                                session_id: like.session_id,
                                content_meta_id: newContentMetaId,
                            },
                        })
                        likesCreated++
                    } else {
                        console.warn(
                            `Slug ${slug} not found in new database for like ${like.id}`
                        )
                        likesSkipped++
                    }
                } else {
                    console.warn(
                        `Old content_meta_id ${like.content_meta_id} not found for like ${like.id}`
                    )
                    likesSkipped++
                }
            } else {
                // Handle likes without content_meta_id
                await prisma.like.create({
                    data: {
                        createdAt: new Date(like.createdAt),
                        session_id: like.session_id,
                        content_meta_id: null,
                    },
                })
                likesCreated++
            }
        }

        console.log(`Created ${likesCreated} likes, skipped ${likesSkipped}`)

        return NextResponse.json({
            success: true,
            summary: {
                contentMeta: contentMetaData.length,
                views: { created: viewsCreated, skipped: viewsSkipped },
                likes: { created: likesCreated, skipped: likesSkipped },
            },
        })
    } catch (error) {
        console.error("Migration error:", error)
        return NextResponse.json(
            // @ts-ignore
            { error: "Migration failed", details: error.message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
