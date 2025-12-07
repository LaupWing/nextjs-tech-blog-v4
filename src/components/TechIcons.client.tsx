"use client"
import { ComponentPropsWithoutRef, FC } from "react"
import clsx from "clsx"
import {
    IconFirebase,
    IconGatsby,
    IconGit,
    IconJavascript,
    IconLaravel,
    IconMarkdown,
    IconMongoDB,
    IconNextjs,
    IconNodejs,
    IconPhp,
    IconReact,
    IconRedux,
    IconSolidity,
    IconMySQL,
    IconTailwindcss,
    IconTypescript,
    IconVercel,
    IconVuejs,
    IconWordpress,
} from "./Icons"
import GoogleADKIcon from "./GoogleADKIcon"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export type TechListType = keyof typeof techList

export interface TechIconsProps extends ComponentPropsWithoutRef<"ul"> {
    techs: Array<TechListType>
    activeTechs?: Array<string>
    hoverGradient?: boolean
}

export const TechIcons: FC<TechIconsProps> = ({ className, techs, activeTechs = [], hoverGradient = false }) => {
    return (
        <ul
            className={clsx(
                className,
                "flex flex-wrap text-gray-700 dark:text-gray-200 flex-1 gap-4"
            )}
        >
            {/* SVG gradient definition for active icons */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="tech-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fd004c">
                            <animate attributeName="stop-color" values="#fd004c;#fe9000;#3edf4b;#3363ff;#b102b7;#fd004c" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor="#3edf4b">
                            <animate attributeName="stop-color" values="#3edf4b;#3363ff;#b102b7;#fd004c;#fe9000;#3edf4b" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="#b102b7">
                            <animate attributeName="stop-color" values="#b102b7;#fd004c;#fe9000;#3edf4b;#3363ff;#b102b7" dur="3s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                </defs>
            </svg>
            {techs.map((tech) => {
                if (!techList[tech]) {
                    return null
                }
                const current = techList[tech]
                const isActive = activeTechs.includes(tech)

                return (
                    <li
                        key={current.name}
                        className={clsx(
                            "text-xl list-none transition-transform duration-200",
                            isActive && "tech-icon-gradient-fill",
                            hoverGradient && "tech-icon-hover-gradient hover:scale-110 cursor-pointer"
                        )}
                    >
                        <Tooltip>
                            <TooltipTrigger className="flex">
                                <current.icon size={30} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{current.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </li>
                )
            })}
        </ul>
    )
}

const techList = {
    react: {
        icon: IconReact,
        name: "React",
    },
    nextjs: {
        icon: IconNextjs,
        name: "Next.js",
    },
    tailwindcss: {
        icon: IconTailwindcss,
        name: "Tailwind CSS",
    },
    javascript: {
        icon: IconJavascript,
        name: "Javascript",
    },
    mysql: {
        icon: IconMySQL,
        name: "MySQL",
    },
    php: {
        icon: IconPhp,
        name: "PHP",
    },
    typescript: {
        icon: IconTypescript,
        name: "Typescript",
    },
    nodejs: {
        icon: IconNodejs,
        name: "Node.js",
    },
    firebase: {
        icon: IconFirebase,
        name: "Firebase",
    },
    mongodb: {
        icon: IconMongoDB,
        name: "MongoDB",
    },
    swr: {
        icon: IconVercel,
        name: "SWR",
    },
    redux: {
        icon: IconRedux,
        name: "Redux",
    },
    laravel: {
        icon: IconLaravel,
        name: "Laravel",
    },
    mdx: {
        icon: IconMarkdown,
        name: "MDX",
    },
    git: {
        icon: IconGit,
        name: "Git",
    },
    gatsby: {
        icon: IconGatsby,
        name: "Gatsby",
    },
    wordpress: {
        icon: IconWordpress,
        name: "Wordpress",
    },
    vue: {
        icon: IconVuejs,
        name: "Vue",
    },
    solidity: {
        icon: IconSolidity,
        name: "Solidity",
    },
    googleadk: {
        icon: GoogleADKIcon,
        name: "Google ADK",
    },
}
