import { LoadedContainer } from "@/components/containers/LoadedContainer.client"
import { IconGithub, IconNewspaper, IconTwitter } from "@/components/Icons"
import { ContactMe } from "@/components/sections/ContactMe"
import { Accent } from "@/components/ui/accent"
import { Button } from "@/components/ui/button"
import { TC } from "@/components/ui/tc"
import Link from "next/link"
import { FC } from "react"

export default function Home() {
    return (
        <main>
            <HomeIntro />
            <ContactMe />
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
                <TC className="absolute bottom-0 right-6 transform-gpu w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px] h-[calc(100%-3rem)] md:h-[600px] 2xl:h-[900px] opacity-20 dark:opacity-10 stroke-slate-400 dark:stroke-accent" />
            </section>
        </LoadedContainer>
    )
}
