import { ContentType, PickFrontmatter } from "@/types/frontmatters"
import { prisma } from "./prisma"

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
