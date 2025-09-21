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
import { IoLogoFirebase } from "react-icons/io5"
import { SiGatsby } from "react-icons/si"

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
