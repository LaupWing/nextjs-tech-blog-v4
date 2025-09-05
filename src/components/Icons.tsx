import { Menu, Moon, Sun, X } from "lucide-react"

export const IconMenu = (props: React.SVGProps<SVGSVGElement>) => {
    return <Menu {...props} />
}

export const IconSun = (props: React.SVGProps<SVGSVGElement>) => {
    return <Sun {...props} />
}

export const IconMoon = (props: React.SVGProps<SVGSVGElement>) => {
    return <Moon {...props} />
}

export const IconClose = (props: React.SVGProps<SVGSVGElement>) => {
    return <X {...props} />
}
