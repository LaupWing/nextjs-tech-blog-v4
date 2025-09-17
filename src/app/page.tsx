import { LoadedContainer } from "@/components/containers/LoadedContainer.client"
import { IconGithub, IconNewspaper, IconTwitter } from "@/components/Icons"
import { Accent } from "@/components/ui/accent"
import { Button } from "@/components/ui/button"
import { TC } from "@/components/ui/TC"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

export default function Home() {
    return (
        <main>
            <HomeIntro />
        </main>
        // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        //     <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        //         <Image
        //             className="dark:invert"
        //             src="/next.svg"
        //             alt="Next.js logo"
        //             width={180}
        //             height={38}
        //             priority
        //         />
        //         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        //             <li className="mb-2 tracking-[-.01em]">
        //                 Get started by editing{" "}
        //                 <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
        //                     src/app/page.tsx
        //                 </code>
        //                 .
        //             </li>
        //             <li className="tracking-[-.01em]">
        //                 Save and see your changes instantly.
        //             </li>
        //         </ol>

        //         <div className="flex gap-4 items-center flex-col sm:flex-row">
        //             <a
        //                 className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        //                 href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //             >
        //                 <Image
        //                     className="dark:invert"
        //                     src="/vercel.svg"
        //                     alt="Vercel logomark"
        //                     width={20}
        //                     height={20}
        //                 />
        //                 Deploy now
        //             </a>
        //             <a
        //                 className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        //                 href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //             >
        //                 Read our docs
        //             </a>
        //         </div>
        //     </main>
        //     <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        //         <a
        //             className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        //             href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             <Image
        //                 aria-hidden
        //                 src="/file.svg"
        //                 alt="File icon"
        //                 width={16}
        //                 height={16}
        //             />
        //             Learn
        //         </a>
        //         <a
        //             className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        //             href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             <Image
        //                 aria-hidden
        //                 src="/window.svg"
        //                 alt="Window icon"
        //                 width={16}
        //                 height={16}
        //             />
        //             Examples
        //         </a>
        //         <a
        //             className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        //             href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             <Image
        //                 aria-hidden
        //                 src="/globe.svg"
        //                 alt="Globe icon"
        //                 width={16}
        //                 height={16}
        //             />
        //             Go to nextjs.org →
        //         </a>
        //     </footer>
        // </div>
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
                <div className="custom-container">
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
