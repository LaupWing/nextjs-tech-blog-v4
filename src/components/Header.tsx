"use client"
import { useSelectedLayoutSegment } from "next/navigation"
import { FC, useEffect, useState } from "react"
import clsx from "clsx"
import { ThemeButton } from "./ThemeButton.client"
import { IconClose, IconMenu } from "./Icons"
import Link from "next/link"

interface HeaderProps {
    large?: boolean
}

export const Header: FC<HeaderProps> = () => {
    const [onTop, setOnTop] = useState<boolean>(false)
    const [overDarkSection, setOverDarkSection] = useState<boolean>(false)
    const activeSegment = useSelectedLayoutSegment()
    const [show_side_nav, setShowSideNav] = useState<boolean>(false)

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setOnTop(window.scrollY > 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    // Intersection Observer for dark sections
    useEffect(() => {
        const darkSections = document.querySelectorAll('[data-header-dark]')
        if (darkSections.length === 0) return

        const activeSections = new Set<Element>()

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        activeSections.add(entry.target)
                    } else {
                        activeSections.delete(entry.target)
                    }
                })
                setOverDarkSection(activeSections.size > 0)
            },
            {
                // Trigger when element enters the header zone (top 80px of viewport)
                rootMargin: '-0px 0px -90% 0px',
                threshold: 0,
            }
        )

        darkSections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    const links = [
        {
            href: "/",
            label: "Home",
            segement: null,
        },
        {
            href: "/blog",
            label: "Blog",
            segement: "blog",
        },
        {
            href: "/projects",
            label: "Projects",
            segement: "projects",
        },
        {
            href: "/library",
            label: "Library",
            segement: "library",
        },
        {
            href: "/about",
            label: "About",
            segement: "about",
        },
        {
            href: "/contact",
            label: "Contact",
            segement: "contact",
        },
    ]

    return (
        <header className="sticky top-0 flex flex-col z-50 h-18 duration-300 transition-shadow bg-light dark:bg-dark justify-between items-center">
            <div
                className={`fixed block sm:hidden duration-500 transform inset-0 bg-background z-50
                    ${show_side_nav ? "translate-x-0" : "-translate-x-full"}`}
            >
                <ul className="flex flex-col items-start py-8 px-10 justify-between gap-3 text-base">
                    <button
                        onClick={() => setShowSideNav(false)}
                        className="ml-auto"
                    >
                        <IconClose size={30} />
                    </button>
                    {links.map(({ href, label, segement }) => (
                        <li
                            onClick={() => setShowSideNav(false)}
                            className="pb-2"
                            key={`${href}-${label}`}
                        >
                            <Link href={href}>{label}</Link>
                            {activeSegment === segement ? (
                                <div className="h-[3px] gradient-animation-slow w-full shadow" />
                            ) : (
                                <div className="h-[3px]" />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="gradient-animation w-full h-1.5 bg-red-400" />
            <div className="px-2 w-full sm:px-0">
                <nav
                    className={clsx(
                        "max-w-2xl w-full flex items-center justify-between backdrop-blur-sm border rounded-full mt-4 p-1.5 duration-300 mx-auto transition-colors",
                        onTop && "shadow-sm",
                        overDarkSection
                            ? "bg-black/40 border-white/20 text-white"
                            : "bg-black/2 dark:bg-white/4 border-gray-300/30 dark:border-gray-800/30 text-dark dark:text-light"
                    )}
                >
                    <button
                        onClick={() => setShowSideNav(true)}
                        className={clsx(
                            "flex sm:hidden ml-4 transition-colors duration-300",
                            overDarkSection ? "text-white" : "text-slate-900 dark:text-white"
                        )}
                    >
                        <IconMenu size={30} />
                    </button>
                    <ul className="sm:flex hidden items-center justify-between gap-x-3 text-xs md:gap-6 md:text-base sm:ml-4 ml-2">
                        {links.map(({ href, label, segement }) => (
                            <li
                                className={clsx(
                                    "transition-colors duration-300",
                                    activeSegment === segement
                                        ? "gradient-animation-slow bg-clip-text font-semibold text-transparent"
                                        : overDarkSection
                                            ? "text-white"
                                            : "text-gray-900 dark:text-white"
                                )}
                                key={`${href}-${label}`}
                            >
                                <Link href={href}>{label}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center">
                        <ThemeButton />
                    </div>
                </nav>
            </div>
        </header>
    )
}
