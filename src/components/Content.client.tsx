"use client"
import type { FC } from "react"

import { useEffect, useMemo, useState } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { MDXComponents } from "./MDXComponents"
import { Loader2 } from "lucide-react"

interface ContentProps {
    code: string
}
export const Content: FC<ContentProps> = ({ code }) => {
    const Component = useMemo(() => getMDXComponent(code), [code])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <article className="mdx xl:col-span-1 mt-4 projects prose mx-auto w-full transition-colors dark:prose-invert">
            {!loaded ? (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin h-8" />
                </div>
            ) : (
                <Component
                    components={
                        {
                            ...MDXComponents,
                        } as any
                    }
                />
            )}
        </article>
    )
}
