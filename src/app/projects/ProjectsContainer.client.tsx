"use client"
import type { FC } from "react"
import type { ProjectFrontmatter } from "@/types/frontmatters"

import { ProjectCard } from "@/components/cards/ProjectCard"
import { TechListType } from "@/components/TechIcons.client"
import { useState, useMemo } from "react"
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
} from "@/components/Icons"
import GoogleADKIcon from "@/components/GoogleADKIcon"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface ProjectsContainerProps {
    projects: Array<ProjectFrontmatter>
}

const techList: Record<string, { icon: FC<{ size?: number }>, name: string }> = {
    react: { icon: IconReact, name: "React" },
    nextjs: { icon: IconNextjs, name: "Next.js" },
    tailwindcss: { icon: IconTailwindcss, name: "Tailwind CSS" },
    javascript: { icon: IconJavascript, name: "Javascript" },
    mysql: { icon: IconMySQL, name: "MySQL" },
    php: { icon: IconPhp, name: "PHP" },
    typescript: { icon: IconTypescript, name: "Typescript" },
    nodejs: { icon: IconNodejs, name: "Node.js" },
    firebase: { icon: IconFirebase, name: "Firebase" },
    mongodb: { icon: IconMongoDB, name: "MongoDB" },
    swr: { icon: IconVercel, name: "SWR" },
    redux: { icon: IconRedux, name: "Redux" },
    laravel: { icon: IconLaravel, name: "Laravel" },
    mdx: { icon: IconMarkdown, name: "MDX" },
    git: { icon: IconGit, name: "Git" },
    gatsby: { icon: IconGatsby, name: "Gatsby" },
    wordpress: { icon: IconWordpress, name: "Wordpress" },
    vue: { icon: IconVuejs, name: "Vue" },
    solidity: { icon: IconSolidity, name: "Solidity" },
    googleadk: { icon: GoogleADKIcon, name: "Google ADK" },
}

export const ProjectsContainer: FC<ProjectsContainerProps> = ({ projects }) => {
    const [activeTechs, setActiveTechs] = useState<string[]>([])

    // Get all unique techs from projects
    const allTechs = useMemo(() => {
        const techSet = new Set<string>()
        projects.forEach((project) => {
            project.techs.split(",").forEach((tech) => {
                const trimmed = tech.trim()
                if (techList[trimmed]) {
                    techSet.add(trimmed)
                }
            })
        })
        return Array.from(techSet)
    }, [projects])

    // Filter projects based on active techs
    const filteredProjects = useMemo(() => {
        if (activeTechs.length === 0) return projects
        return projects.filter((project) => {
            const projectTechs = project.techs.split(",").map((t) => t.trim())
            return activeTechs.some((tech) => projectTechs.includes(tech))
        })
    }, [projects, activeTechs])

    const toggleTech = (tech: string) => {
        setActiveTechs((prev) =>
            prev.includes(tech)
                ? prev.filter((t) => t !== tech)
                : [...prev, tech]
        )
    }

    return (
        <>
            {/* SVG gradient definition for active icons */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="project-filter-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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

            {/* Tech filter icons */}
            <div className="mt-4 flex flex-wrap items-center gap-2" data-fade="2">
                <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">Filter by tech:</span>
                <div className="flex flex-wrap gap-3">
                    {allTechs.map((tech) => {
                        const current = techList[tech]
                        const isActive = activeTechs.includes(tech)
                        return (
                            <Tooltip key={tech}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => toggleTech(tech)}
                                        className={clsx(
                                            "p-1.5 rounded-md cursor-pointer transition-all duration-200 hover:scale-110",
                                            isActive
                                                ? "project-filter-gradient-fill"
                                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                        )}
                                    >
                                        <current.icon size={24} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{current.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                </div>
            </div>

            {/* Projects grid */}
            <ul
                className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in-delay"
                key={activeTechs.join(",")}
                data-fade="3"
            >
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            activeTechs={activeTechs}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
                        No projects found with selected technologies.
                    </p>
                )}
            </ul>
        </>
    )
}
