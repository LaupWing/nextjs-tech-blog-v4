import type { Metadata } from "next"
import { LoadedContainer } from "@/components/containers/LoadedContainer.client"
import seo from "@/lib/seo"

export const metadata: Metadata = {
    ...seo({
        title: "Contact",
        as_path: "contact",
        description:
            "Get in touch with Loc Nguyen for web development projects, freelance work, or tutoring opportunities.",
    }),
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <LoadedContainer id="skip-nav">{children}</LoadedContainer>
}
