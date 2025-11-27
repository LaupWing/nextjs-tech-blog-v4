import type { Metadata } from "next"
import { Accent } from "@/components/Accent"
import { getAllFilesFrontmatter } from "@/lib/mdx"
import seo from "@/lib/seo"
import { ProjectsContainer } from "./ProjectsContainer.client"

export const metadata: Metadata = {
    ...seo({
        title: "Projects",
        as_path: "projects",
        description:
            "Showcase of my web development projects built with React, Next.js, Vue.js, Laravel, and other modern technologies.",
    }),
}

const fetchProjects = async () => {
    const projects = await getAllFilesFrontmatter("projects")
    return projects
}

const Projects = async () => {
    const projects = await fetchProjects()

    return (
        <section className="container py-12">
            <h1 className="text-3xl font-bold md:text-5xl" data-fade="0">
                <Accent>Projects</Accent>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
                My favorite projects.
            </p>
            <ProjectsContainer projects={projects} />
        </section>
    )
}
export default Projects
