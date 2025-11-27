import type { Metadata } from "next"
import { Accent } from "@/components/Accent"
import { CloudinaryImage } from "@/components/CloudinaryImage.client"
import { CustomLink } from "@/components/CustomLink"
import { TechIcons } from "@/components/TechIcons.client"
import { IconGithub, IconLinkedin, IconTwitter } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import seo from "@/lib/seo"
import Link from "next/link"

export const metadata: Metadata = {
    ...seo({
        title: "About",
        as_path: "about",
        description:
            "Learn more about Loc Nguyen, a passionate full-stack web developer with 7+ years of experience in Vue.js, React/Next.js, Node.js, and Laravel.",
    }),
}

const About = () => {
    return (
        <main className="container py-12 md:py-20 max-w-4xl">
            {/* Hero Section */}
            <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
                <div className="flex-1 text-center md:text-left">
                    <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2" data-fade="0">
                        Full-Stack Developer
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4" data-fade="1">
                        Hi, I'm <Accent>Loc Nguyen</Accent>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6" data-fade="2">
                        I craft beautiful, performant web experiences with modern technologies.
                        7+ years of turning ideas into reality.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4" data-fade="3">
                        <Link href="/contact">
                            <Button variant="gradient-animation">
                                Get in Touch
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/LaupWing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <IconGithub className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linkedin.com/in/locnguyen"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <IconLinkedin className="w-6 h-6" />
                            </a>
                            <a
                                href="https://twitter.com/laupwing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <IconTwitter className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="relative" data-fade="4">
                    <div className="absolute inset-0 gradient-animation rounded-full blur-2xl opacity-30 scale-110" />
                    <CloudinaryImage
                        className="relative w-48 h-48 md:w-72 md:h-72 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl"
                        public_id="techblog/laup_d5azzz"
                        alt="Loc Nguyen"
                        width={400}
                        height={400}
                    />
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 mt-12 border-y border-gray-200 dark:border-gray-800" data-fade="5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <p className="text-3xl md:text-4xl font-bold gradient-animation-slow bg-clip-text text-transparent">7+</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Years Experience</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl md:text-4xl font-bold gradient-animation-slow bg-clip-text text-transparent">50+</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Projects Completed</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl md:text-4xl font-bold gradient-animation-slow bg-clip-text text-transparent">15+</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Technologies</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl md:text-4xl font-bold gradient-animation-slow bg-clip-text text-transparent">100%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Passion</p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" data-fade="6">
                    My <Accent>Journey</Accent>
                </h2>
                <div className="space-y-8">
                    <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700" data-fade="7">
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full gradient-animation" />
                        <h3 className="font-semibold text-lg mb-2">The Beginning</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            My passion for programming started early. While IT university curricula
                            were too broad, I took the self-taught route through YouTube tutorials.
                            Web development captured my heart, and I dove into building websites independently.
                        </p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700" data-fade="8">
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full gradient-animation" />
                        <h3 className="font-semibold text-lg mb-2">Formal Education</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            I enrolled in{" "}
                            <CustomLink href="https://www.hva.nl/opleidingen/communication-and-multimedia-design">
                                Communication Multimedia Design
                            </CustomLink>
                            , where I deepened my coding skills and learned crucial soft skills like
                            communication, time management, and teamwork.
                        </p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700" data-fade="8">
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full gradient-animation" />
                        <h3 className="font-semibold text-lg mb-2">Professional Growth</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            With 7 years of professional experience, I've mastered{" "}
                            <CustomLink href="https://vuejs.org/">Vue.js</CustomLink>,{" "}
                            <CustomLink href="https://nextjs.org/">React/Next.js</CustomLink>,{" "}
                            <CustomLink href="https://nodejs.org/en">Node.js</CustomLink>, and{" "}
                            <CustomLink href="https://laravel.com/">PHP/Laravel</CustomLink>.
                            Now expanding into DevOps and cloud technologies.
                        </p>
                    </div>
                    <div className="relative pl-8" data-fade="8">
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full gradient-animation" />
                        <h3 className="font-semibold text-lg mb-2">Today & Beyond</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            This website is my platform for sharing knowledge through blogging and
                            showcasing projects. I believe teaching enhances learning, and I'm always
                            eager to help others on their coding journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-16 border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4" data-fade="8">
                    Tech <Accent>Stack</Accent>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-12" data-fade="8">
                    Technologies I use daily to bring ideas to life
                </p>

                <div className="space-y-8">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8" data-fade="8">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full gradient-animation" />
                            Current Favorites
                        </h3>
                        <TechIcons
                            className="gap-4"
                            techs={[
                                "googleadk",
                                "laravel",
                                "nextjs",
                                "vue",
                                "react",
                                "tailwindcss",
                                "typescript",
                                "php",
                                "mysql",
                            ]}
                        />
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8" data-fade="8">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full gradient-animation" />
                            Full Toolkit
                        </h3>
                        <TechIcons
                            className="gap-4"
                            techs={[
                                "firebase",
                                "react",
                                "vue",
                                "nextjs",
                                "tailwindcss",
                                "typescript",
                                "javascript",
                                "nodejs",
                                "mongodb",
                                "laravel",
                                "wordpress",
                                "php",
                                "mysql",
                                "git",
                                "gatsby",
                                "solidity",
                                "redux",
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 text-center border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold mb-4" data-fade="8">
                    Let's Build Something <Accent>Amazing</Accent>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8" data-fade="8">
                    Have a project in mind? I'm always open to discussing new opportunities,
                    creative ideas, or ways to help bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-fade="8">
                    <Link href="/contact">
                        <Button variant="gradient-animation">
                            Start a Conversation
                        </Button>
                    </Link>
                    <Link href="/projects">
                        <Button>
                            View My Work
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    )
}
export default About
