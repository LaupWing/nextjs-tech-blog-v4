import { FC, ReactNode } from "react"
import { IconGithub, IconLinkedin, IconTwitter } from "./Icons"
import Link from "next/link"
import { IconType } from "react-icons"
import { Accent } from "./Accent"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
// import { Tooltip } from "./Tooltip"

export const Footer: FC = () => {
    return (
        <footer className="pt-4 pb-12">
            <main className="layout flex flex-col items-center border-t pt-6 dark:border-gray-600">
                <FooterLinks />
                <p className="mt-12 font-medium text-gray-600 dark:text-gray-300">
                    Reach Out
                </p>

                <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
                    © Laup Wing {new Date().getFullYear()}
                </p>
                <SocialLinks />
            </main>
        </footer>
    )
}

const FooterLinks = () => {
    return (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {footerLinks.map(({ href, text }) => (
                <Link
                    className="animated-underline rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-accent-dark dark:text-gray-200 dark:focus-visible:ring-accent-light"
                    href={href}
                    key={href}
                >
                    {text}
                </Link>
            ))}
        </div>
    )
}

const SocialLinks = () => {
    return (
        <div className="mt-4 flex space-x-4">
            <div className="flex gap-4 items-center justify-center">
                {social.map(({ href, icon: Icon, id, text }) => (
                    <Tooltip>
                        <TooltipTrigger>
                            <a
                                key={id}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-accent-light"
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div>{text}</div>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}

interface Social {
    href: string
    icon: IconType
    id: string
    text: ReactNode
}

const social: Social[] = [
    {
        href: "https://github.com/LaupWing",
        icon: IconGithub,
        id: "Github",
        text: (
            <>
                See my projects on{" "}
                <Accent className="font-medium">Github</Accent>
            </>
        ),
    },
    {
        href: "https://www.linkedin.com/in/loc-nguyen-a33896272/",
        icon: IconLinkedin,
        id: "Linkedin",
        text: (
            <>
                Find me on <Accent className="font-medium">Linkedin</Accent>
            </>
        ),
    },
    {
        href: "https://twitter.com/LaupWing1994",
        icon: IconTwitter,
        id: "Twitter",
        text: (
            <>
                For tech tips. Follow me on{" "}
                <Accent className="font-medium">Twitter</Accent>
            </>
        ),
    },
]

const footerLinks: Array<{
    href: string
    text: string
    tooltip?: ReactNode
}> = [
    {
        href: "https://github.com/LaupWing/tech-blog",
        text: "Source Code",
    },
    {
        href: "/",
        text: "Home",
    },
    {
        href: "/blog",
        text: "Blog",
    },
    {
        href: "/projects",
        text: "Projects",
    },
    {
        href: "/library",
        text: "Library",
    },
    {
        href: "/about",
        text: "About",
    },
]
