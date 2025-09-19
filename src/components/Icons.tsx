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
