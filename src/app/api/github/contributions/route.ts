import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get("year")
    const infoOnly = searchParams.get("info") === "true"

    // If only requesting user info (for available years)
    if (infoOnly) {
        const infoQuery = `
            query($username: String!) {
                user(login: $username) {
                    createdAt
                }
            }
        `

        try {
            const response = await fetch("https://api.github.com/graphql", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: infoQuery,
                    variables: {
                        username: process.env.GITHUB_USERNAME,
                    },
                }),
            })

            const data = await response.json()

            if (data.errors) {
                return NextResponse.json({ error: data.errors }, { status: 400 })
            }

            const createdAt = new Date(data.data.user.createdAt)
            const joinYear = createdAt.getFullYear()
            const currentYear = new Date().getFullYear()
            const availableYears = Array.from(
                { length: currentYear - joinYear + 1 },
                (_, i) => currentYear - i
            )

            return NextResponse.json({
                joinYear,
                availableYears,
            })
        } catch (error) {
            console.error("GitHub API error:", error)
            return NextResponse.json({ error: "Failed to fetch user info" }, { status: 500 })
        }
    }

    // Fetch contributions for a specific year
    const targetYear = year || new Date().getFullYear().toString()

    const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                                weekday
                            }
                        }
                    }
                }
            }
        }
    `

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables: {
                    username: process.env.GITHUB_USERNAME,
                    from: `${targetYear}-01-01T00:00:00Z`,
                    to: `${targetYear}-12-31T23:59:59Z`,
                },
            }),
        })

        const data = await response.json()

        if (data.errors) {
            return NextResponse.json({ error: data.errors }, { status: 400 })
        }

        // Transform data to simple 2D array format (52 weeks x 7 days)
        const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks
        const contributionData = weeks.map((week: { contributionDays: { contributionCount: number; date: string; weekday: number }[] }) =>
            week.contributionDays.map((day: { contributionCount: number }) => day.contributionCount)
        )

        return NextResponse.json({
            contributions: contributionData,
            year: parseInt(targetYear)
        })
    } catch (error) {
        console.error("GitHub API error:", error)
        return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 })
    }
}
