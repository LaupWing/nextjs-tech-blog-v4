import { Menu, Moon, Sun, X } from "lucide-react"
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
