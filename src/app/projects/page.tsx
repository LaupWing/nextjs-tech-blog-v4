import type { Metadata } from "next"
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
            <ProjectsContainer projects={projects} />
        </section>
    )
}
export default Projects
