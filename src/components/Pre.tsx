import type { ComponentPropsWithoutRef, FC } from "react"

interface PreProps extends ComponentPropsWithoutRef<"pre"> {}

export const Pre: FC<PreProps> = (props) => {
    return (
        <pre
            {...props}
            style={{ position: "relative", paddingTop: "2.5rem" }}
        >
            {props.children}
        </pre>
    )
}
