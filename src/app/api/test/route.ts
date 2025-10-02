import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET() {
    const contentMeta = await prisma.contentMeta.findMany()

    return new Response(JSON.stringify(contentMeta))
}
