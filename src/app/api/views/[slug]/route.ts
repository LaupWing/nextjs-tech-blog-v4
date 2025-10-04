import { extractSlug, getSessionId, getUserLikeCount } from "@/lib/helper"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const slug = extractSlug(req)
        const sessionId = getSessionId(req)
        const likesByUser = await getUserLikeCount({
            sessionId: sessionId,
            slug: slug,
        })
        const content = await prisma.contentMeta.findFirst({
            where: {
                slug: slug,
            },
            include: {
                _count: {
                    select: {
                        View: true,
                        Like: true,
                    },
                },
            },
        })

        return NextResponse.json(
            {
                contentViews: content?._count.View ?? 0,
                contentLikes: content?._count.Like ?? 0,
                likesByUser: likesByUser,
            },
            {
                status: 200,
            }
        )
    } catch (e: unknown) {
        console.log(e)
        if (e instanceof Error) {
            return NextResponse.json(
                {
                    message: e.message ?? "Internal Server Error",
                },
                {
                    status: 500,
                }
            )
        } else {
            return NextResponse.json(
                {
                    message: "Internal Server Error",
                },
                {
                    status: 500,
                }
            )
        }
    }
}

export async function POST(req: Request) {
    try {
        const sessionId = getSessionId(req)
        const slug = extractSlug(req)
        const content = await prisma.contentMeta.upsert({
            where: {
                slug: slug,
            },
            create: {
                slug: slug,
                View: {
                    create: {
                        session_id: sessionId,
                    },
                },
            },
            update: {
                View: {
                    create: {
                        session_id: sessionId,
                    },
                },
            },
            include: {
                _count: {
                    select: {
                        Like: true,
                        View: true,
                    },
                },
            },
        })
        return NextResponse.json(
            {
                contentViews: content?._count.View ?? 0,
                contentLikes: content?._count.Like ?? 0,
            },
            {
                status: 201,
            }
        )
    } catch (e: unknown) {
        if (e instanceof Error) {
            return NextResponse.json(
                {
                    message: e.message ?? "Internal Server Error",
                },
                {
                    status: 500,
                }
            )
        } else {
            return NextResponse.json(
                {
                    message: "Internal Server Error",
                },
                {
                    status: 500,
                }
            )
        }
    }
}
