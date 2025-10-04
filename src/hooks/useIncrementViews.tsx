import React, { useEffect } from "react"

const useIncrementViews = (slug: string, runIncrement = false) => {
    useEffect(() => {
        if (runIncrement) {
            incrementViews(slug)
        }
    }, [runIncrement, slug])
    return <div>useIncrementViews</div>
}

async function incrementViews(slug: string) {
    const res = await fetch("/api/views/" + slug, {
        method: "POST",
    })
    const data = await res.json()
    return data
}
