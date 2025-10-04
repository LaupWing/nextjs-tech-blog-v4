import { useEffect, useState } from "react"

export const useIncrementViews = (slug: string, runIncrement = false) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (runIncrement) {
            setLoading(true)
            incrementViews(slug)
                .then(() => {
                    setLoading(false)
                })
                .catch((e) => {
                    console.log(e)
                    setLoading(false)
                })
        }
    }, [runIncrement, slug])

    return {
        loading,
    }
}

async function incrementViews(slug: string) {
    const res = await fetch("/api/views/" + slug, {
        method: "POST",
    })
    const data = await res.json()
    return data
}
