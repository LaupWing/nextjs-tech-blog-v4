import type { Metadata } from "next"
import { Accent } from "@/components/Accent"
import { ProjectCard } from "@/components/cards/ProjectCard"
import { getAllFilesFrontmatter } from "@/lib/mdx"
import seo from "@/lib/seo"

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
            <ul
                className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                data-fade="2"
            >
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </ul>
        </section>
    )
}
export default Projects
