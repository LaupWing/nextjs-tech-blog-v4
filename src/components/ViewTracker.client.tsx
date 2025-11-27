"use client"
import { useEffect } from "react"

interface ViewTrackerProps {
    slug: string
}

export const ViewTracker = ({ slug }: ViewTrackerProps) => {
    useEffect(() => {
        fetch("/api/views/" + slug, {
            method: "POST",
        }).catch(console.error)
    }, [slug])

    return null
}
