import type { Metadata } from "next"
import NextTopLoader from "nextjs-toploader"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

import "./globals.css"
import "./dracula.css"
import "./mdx.css"
import { Toaster } from "@/components/ui/sonner"
import { default_meta } from "@/config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        default: default_meta.title,
        template: `%s | ${default_meta.siteName}`,
    },
    description: default_meta.description,
    metadataBase: new URL(process.env.SITE_URL || "https://loc-nguyen.com"),
    openGraph: {
        type: "website",
        siteName: default_meta.siteName,
        title: default_meta.title,
        description: default_meta.description,
        images: [
            {
                url: default_meta.banner,
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@laupwing",
        images: [default_meta.banner],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <Toaster />
                <NextTopLoader />
                <Header />
                {children}
                <Footer />
                <Analytics />
            </body>
        </html>
    )
}
