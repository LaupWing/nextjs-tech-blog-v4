import type { ComponentPropsWithoutRef, FC } from "react"
import clsx from "clsx"

export const Accent: FC<ComponentPropsWithoutRef<"span">> = ({
    children,
    className,
}) => {
    return (
        <div className="dark:!bg-gradient-to-r dark:!from-dark dark:!to-dark gradient-animation-slow inline-block text-white py-0.5">
            <span
                className={clsx(
                    className,
                    "transition-colors gradient-animation-slow dark:bg-clip-text dark:text-transparent"
                )}
            >
                {children}
            </span>
        </div>
    )
}
