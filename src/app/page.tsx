import { BlogCard } from "@/components/cards/BlogCard"
import { LoadedContainer } from "@/components/containers/LoadedContainer.client"
import { IconGithub, IconNewspaper, IconTwitter } from "@/components/Icons"
import { ContactMe } from "@/components/sections/ContactMe"
import { Accent } from "@/components/Accent"
import { Button } from "@/components/ui/button"
import { TC } from "@/components/TC"
import { attachContentMeta } from "@/lib/helper"
import { getAllFilesFrontmatter, getRecent } from "@/lib/mdx"
import Link from "next/link"
import { FC } from "react"
import { ProjectCard } from "@/components/cards/ProjectCard"

export default function Home() {
    return (
        <main>
            <HomeIntro />
            <ContactMe />
            <HomeBlogs />
            <HomeProjects />
        </main>
    )
}

const HomeIntro: FC = async () => {
    const social_link_style =
        "inline-flex items-center gap-1 text-sm font-medium md:text-base text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-accent-light group"

    const socials = [
        {
            name: "Resume",
            icon: IconNewspaper,
            href: `${process.env.BASE_URL}resume.pdf`,
            label: "resume",
            className: "",
        },
        {
            name: "Twitter",
            icon: IconTwitter,
            href: "https://google.com",
            label: "@laupwing",
            className: "group-hover:text-[#1da1f2]",
        },
        {
            name: "Github",
            icon: IconGithub,
            href: "https://google.com",
            label: "laupwing",
            className: "",
        },
    ]

    return (
        <LoadedContainer id="skip-nav">
            <section className="flex flex-col items-center justify-center h-screen">
                <div className="container">
                    <h2
                        className="text-2xl text-dark dark:text-light font-bold md:text-4xl 2xl:text-5xl"
                        data-fade="1"
                    >
                        Hello
                    </h2>
                    <h1
                        className="mt-1 text-dark dark:text-light font-bold text-3xl md:text-5xl 2xl:text-6xl"
                        data-fade="2"
                    >
                        My name is <Accent>Loc Nguyen</Accent>
                    </h1>
                    <p
                        className="mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6 md:text-lg 2xl:text-xl"
                        data-fade="3"
                    >
                        I possess a strong enthusiasm for both programming and
                        fitness, finding fulfillment in assisting individuals
                        either at the gym or in the realm of coding.
                    </p>
                    <div
                        className="mt-8 flex flex-wrap gap-4 md:!text-lg"
                        data-fade="4"
                    >
                        <div className="group relative flex">
                            <div className="absolute -inset-0.5 animate-pulse rounded blur from-custom-green bg-gradient-to-r to-custom-purple opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
                            <Button variant="gradient-animation">
                                Read the Blog
                            </Button>
                        </div>
                        <Button href="/about">Learn more about me</Button>
                    </div>
                    <div
                        className="mt-4 flex flex-wrap gap-4 gap-y-2 md:mt-8"
                        data-fade="5"
                    >
                        {socials.map((social) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                className={social_link_style}
                            >
                                <social.icon
                                    className={
                                        "shrink-0 w-5 h-5 transition-colors " +
                                        social.className
                                    }
                                    aria-hidden="true"
                                />
                                <span className="sr-only">{social.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <TC className="absolute bottom-0 right-6 transform-gpu w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px] h-[calc(100%-3rem)] md:h-[600px] 2xl:h-[900px] opacity-20 dark:opacity-10 stroke-slate-400 dark:stroke-emerald-900" />
            </section>
        </LoadedContainer>
    )
}

const fetchRecentBlogs = async () => {
    const blogs = await getAllFilesFrontmatter("blog")
    const recent_blogs = getRecent(blogs)
    return await attachContentMeta<"blog">(recent_blogs)
}

const HomeBlogs: FC = async () => {
    const recent_blogs = await fetchRecentBlogs()

    return (
        <section className="py-20">
            <div className="container">
                <h2
                    id="projects"
                    className="text-2xl font-semibold md:text-4xl"
                >
                    <Accent>Recent Blog Posts</Accent>
                </h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {recent_blogs.map((post) => (
                        // @ts-ignore
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </ul>
                <Link href="/blog">
                    <Button className="mt-4" href="/blog">
                        See more post
                    </Button>
                </Link>
            </div>
        </section>
    )
}

const fetchRecentProjects = async () => {
    const projects = await getAllFilesFrontmatter("projects")
    const recent_projects = getRecent(projects)

    return recent_projects
}

const HomeProjects: FC = async () => {
    const recent_projects = await fetchRecentProjects()

    return (
        <section className="py-20">
            <article className="container">
                <h2
                    id="projects"
                    className="text-2xl font-semibold md:text-4xl"
                >
                    <Accent>Recent Projects</Accent>
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    My most recent awesome projects.
                </p>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {recent_projects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </ul>
                <Link href="/projects">
                    <Button className="mt-4" href="/projects">
                        See more projects
                    </Button>
                </Link>
            </article>
        </section>
    )
}

const fetchRecentLibrary = async () => {
    const library = await getAllFilesFrontmatter("library")

    const recent_library = getRecent(library)

    return await attachContentMeta<"library">(recent_library)
}

const HomeLibrary: FC = async () => {
    const recentLibrary = await fetchRecentLibrary()

    return (
        <section className="py-20">
            <article className="custom-container">
                <h2 className="text-2xl md:text-4xl" id="library">
                    <Accent>Libary of Code Snippets</Accent>
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    List of code snippets. What is documented is never lost.
                </p>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {recentLibrary.map((snippet) => (
                        <LibraryCard key={snippet.slug} snippet={snippet} />
                    ))}
                </ul>
                <Link href="/library">
                    <Button className="mt-4">See more snippets</Button>
                </Link>
            </article>
        </section>
    )
}
