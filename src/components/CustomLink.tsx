import type { FC, PropsWithChildren } from "react"
import clsx from "clsx"
import Link, { LinkProps } from "next/link"

type CustomLinkProps = LinkProps & PropsWithChildren<{ className?: string }>

export const CustomLink: FC<CustomLinkProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <Link
            {...props}
            className={clsx(
                "animated-underline inline-flex items-center font-medium focus:outline-none focus-visible:ring focus-visible:ring-accent-dark dark:focus-visible:ring-light border-b border-dotted border-dark dark:border-light hover:border-dark/0",
                className
            )}
        >
            <span className="dark:gradient-animation-slow dark:bg-clip-text dark:text-transparent">
                {children}
            </span>
        </Link>
    )
}
