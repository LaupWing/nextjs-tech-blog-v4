import type { ComponentPropsWithoutRef, FC } from "react"
import clsx from "clsx"

export type ButtonVariant = "default" | "gradient-animation"

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    is_loading?: boolean
    href?: string
    variant?: ButtonVariant
}

export const Button: FC<ButtonProps> = ({
    children,
    className,
    disabled: button_disabled,
    is_loading,
    href,
    variant = "default",
    ...props
}) => {
    const disabled = is_loading || button_disabled

    const variants: Record<ButtonVariant, string> = {
        default:
            "py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-accent shadow-sm hover:scale-[1.03] active:scale-[0.97] motion-safe:transform-gpu motion-reduce:hover:scale-100 transition duration-100",
        "gradient-animation": "bg-white py-[7px]",
    }

    const classNameComputed = clsx(
        "rounded cursor-pointer font-bold px-4 scale-100 bg-white dark:bg-[#0e0e0e] text-gray-600 disabled:bg-gray-200 dark:text-gray-200 dark:disabled:bg-gray-700 ",
        variants[variant],
        className
    )

    return variant === "gradient-animation" ? (
        <div className="group relative flex">
            <div className="absolute -inset-0.5 animate-pulse rounded blur from-custom-green bg-gradient-to-r to-custom-purple opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />

            <div
                className={
                    "gradient-animation-border shadow hover:scale-[1.03] active:scale-[0.97] motion-safe:transform-gpu motion-reduce:hover:scale-100 transition duration-100 scale-100 " +
                    className
                }
            >
                <button
                    {...props}
                    disabled={disabled}
                    className={classNameComputed}
                >
                    {children}
                </button>
            </div>
        </div>
    ) : (
        <button {...props} disabled={disabled} className={classNameComputed}>
            {children}
        </button>
    )
}
