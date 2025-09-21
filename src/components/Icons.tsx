import {
    Clock,
    Eye,
    Github,
    Menu,
    Moon,
    Newspaper,
    Sun,
    Twitter,
    X,
} from "lucide-react"
import { LucideProps } from "lucide-react"
import { IconType } from "react-icons"
import { FaLaravel } from "react-icons/fa"
import { GrMysql } from "react-icons/gr"
import { IoLogoFirebase } from "react-icons/io5"
import {
    SiGatsby,
    SiGit,
    SiJavascript,
    SiMarkdown,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiPhp,
    SiReact,
    SiRedux,
    SiSolidity,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si"

export const IconMenu = (props: LucideProps) => {
    return <Menu {...props} />
}

export const IconSun = (props: LucideProps) => {
    return <Sun {...props} />
}

export const IconMoon = (props: LucideProps) => {
    return <Moon {...props} />
}

export const IconClose = (props: LucideProps) => {
    return <X {...props} />
}

export const IconTwitter = (props: LucideProps) => {
    return <Twitter {...props} />
}

export const IconGithub = (props: LucideProps) => {
    return <Github {...props} />
}

export const IconNewspaper = (props: LucideProps) => {
    return <Newspaper {...props} />
}

export const IconEye = (props: LucideProps) => {
    return <Eye {...props} />
}

export const IconClock = (props: LucideProps) => {
    return <Clock {...props} />
}

export const IconFirebase: IconType = (props) => {
    return <IoLogoFirebase {...props} />
}

export const IconGatsby: IconType = (props) => {
    return <SiGatsby {...props} />
}

export const IconGit: IconType = (props) => {
    return <SiGit {...props} />
}

export const IconJavascript: IconType = (props) => {
    return <SiJavascript {...props} />
}

export const IconLaravel: IconType = (props) => {
    return <FaLaravel {...props} />
}

export const IconMarkdown: IconType = (props) => {
    return <SiMarkdown {...props} />
}

export const IconMongoDB: IconType = (props) => {
    return <SiMongodb {...props} />
}

export const IconNextjs: IconType = (props) => {
    return <SiNextdotjs {...props} />
}

export const IconNodejs: IconType = (props) => {
    return <SiNodedotjs {...props} />
}

export const IconPhp: IconType = (props) => {
    return <SiPhp {...props} />
}

export const IconReact: IconType = (props) => {
    return <SiReact {...props} />
}

export const IconRedux: IconType = (props) => {
    return <SiRedux {...props} />
}

export const IconSolidity: IconType = (props) => {
    return <SiSolidity {...props} />
}

export const IconMySQL: IconType = (props) => {
    return <GrMysql {...props} />
}

export const IconTailwindcss: IconType = (props) => {
    return <SiTailwindcss {...props} />
}

export const IconTypescript: IconType = (props) => {
    return <SiTypescript {...props} />
}
