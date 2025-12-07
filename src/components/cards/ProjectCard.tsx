import type { ComponentPropsWithoutRef, FC } from "react"
import type { ProjectFrontmatter } from "@/types/frontmatters"
import clsx from "clsx"
import { CloudinaryImage } from "../CloudinaryImage.client"
import Link from "next/link"
import { TechIcons, TechListType } from "../TechIcons.client"
import { IconStar } from "../Icons"

interface ProjectCardProps extends ComponentPropsWithoutRef<"li"> {
    project: ProjectFrontmatter
    activeTechs?: string[]
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, className, activeTechs = [] }) => {
    return (
        <li
            className={clsx(
                "project-card shadow border-gray-300 rounded-md md:w-full border dark:border-gray-600 scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu transition duration-100 motion-reduce:hover:scale-100 animate-shadow",
                className
            )}
        >
            <Link
                href={`/projects/${project.slug}`}
                className="flex h-full flex-col items-start rounded-md p-4 focus:outline-none focus-visible:ring focus-visible:ring-accent-light"
            >
                <div className="flex w-full items-start justify-between gap-2">
                    <h4 className="dark:text-white">{project.title}</h4>
                    {project.favorite && (
                        <span className="inline-flex items-center gap-1 rounded-full gradient-animation px-2 py-0.5 text-xs font-medium text-white shrink-0">
                            <IconStar className="h-3 w-3" />
                            Featured
                        </span>
                    )}
                </div>
                <p className="mb-auto text-sm text-gray-700 dark:text-gray-300">
                    {project.description}
                </p>
                <div className="mt-2">
                    <TechIcons
                        techs={project.techs.split(",") as Array<TechListType>}
                        activeTechs={activeTechs}
                    />
                </div>
                <CloudinaryImage
                    className="pointer-events-none mt-3 w-full"
                    public_id={project.banner}
                    alt={project.title}
                    width={1440}
                    height={792}
                />
                <p className="animated-underline dark:text-white mt-2 inline-block font-medium">
                    See more →
                </p>
            </Link>
        </li>
    )
}
