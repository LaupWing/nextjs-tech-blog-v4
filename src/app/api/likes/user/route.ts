import { generateSessionId } from "@/lib/helper"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get("slug")!
    const session_id = generateSessionId(request)
    if (!session_id) {
        return new Response("0")
    }
    const likes = await prisma.like.count({
        where: {
            session_id,
            ContentMeta: {
                slug,
            },
        },
    })
    return new Response(likes.toString())
}

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get("slug")!
    const session_id = generateSessionId(request)

    if (!session_id || !slug) {
        return NextResponse.json(
            { message: "Missing session or slug" },
            { status: 400 }
        )
    }

    const userLikeCount = await prisma.like.count({
        where: {
            session_id,
            ContentMeta: {
                slug,
            },
        },
    })

    if (userLikeCount >= 5) {
        return NextResponse.json(
            { message: "Max like count is 5" },
            { status: 200 }
        )
    }

    await prisma.contentMeta.upsert({
        where: { slug },
        create: {
            slug,
            Like: {
                create: {
                    session_id,
                },
            },
        },
        update: {
            Like: {
                create: {
                    session_id,
                },
            },
        },
    })

    return NextResponse.json(
        { message: "Like added successfully" },
        { status: 201 }
    )
}
