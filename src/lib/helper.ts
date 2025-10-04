import { ContentType, PickFrontmatter } from "@/types/frontmatters"
import { prisma } from "./prisma"
import { NextRequest } from "next/server"
import { createHash } from "crypto"
import { z } from "zod"

export const attachContentMeta = async <T extends ContentType>(
    frontmatters: Array<PickFrontmatter<T>>
) => {
    const results = []

    for (const frontmatter of frontmatters) {
        const data = await prisma.contentMeta.upsert({
            where: {
                slug: frontmatter.slug,
            },
            update: {
                slug: frontmatter.slug,
            },
            create: {
                slug: frontmatter.slug,
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

        results.push({
            ...frontmatter,
            views: data._count.View,
            likes: data._count.Like,
        })
        prisma.$disconnect()
    }

    return results
}

export const getFromSessionStorage = (key: string) => {
    if (typeof sessionStorage !== "undefined") {
        return sessionStorage.getItem(key)
    }
    return null
}

export function generateSessionId(req: NextRequest): string {
    const ip_address = req.headers.get("x-forwarded-for") || "0.0.0.0"
    const salt = process.env.IP_ADDRESS_SALT || "SOME_SALT"

    const current_user_id = createHash("md5")
        .update(ip_address + salt, "utf8")
        .digest("hex")

    return current_user_id
}

export const getSessionId = (req: Request) => {
    const ip_address = req.headers.get("x-forwarded-for") || "0.0.0.0"

    const current_user_id = createHash("md5")
        .update(ip_address + (process.env.IP_ADDRESS_SALT as string), "utf8")
        .digest("hex")
    return current_user_id
}

export const extractSlug = (req: Request) => {
    const splitted = req.url.split("/")
    const availableEndpoints = ["content", "like"]

    if (availableEndpoints.includes(splitted[splitted.length - 2])) {
        const slug = z.string().parse(splitted[splitted.length - 1])
        return slug
    } else {
        throw new Error("Not a content API endpoint")
    }
}

export const getUserLikeCount = async ({
    sessionId,
    slug,
}: {
    sessionId: string
    slug: string
}) => {
    return await prisma.like.count({
        where: {
            session_id: sessionId,
            ContentMeta: {
                slug: slug,
            },
        },
    })
}
