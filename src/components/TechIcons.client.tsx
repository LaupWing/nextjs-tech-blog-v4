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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export type TechListType = keyof typeof techList

export interface TechIconsProps extends ComponentPropsWithoutRef<"ul"> {
    techs: Array<TechListType>
}

export const TechIcons: FC<TechIconsProps> = ({ className, techs }) => {
    return (
        <ul
            className={clsx(
                className,
                "flex flex-wrap text-gray-700 dark:text-gray-200 flex-1 gap-4"
            )}
        >
            {techs.map((tech) => {
                if (!techList[tech]) {
                    return null
                }
                const current = techList[tech]

                return (
                    <li key={current.name} className="text-xl list-none">
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
}
