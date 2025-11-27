import { ImageResponse } from "next/og"
import { CSSProperties } from "react"

export const runtime = "edge"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const siteName = searchParams.get("siteName")
    const description = searchParams.get("description")
    const theme = searchParams.get("theme")
    const templateTitle = searchParams.get("templateTitle")

    const query = {
        siteName: siteName ?? "Loc Nguyen",
        description: description ?? "Full-Stack Developer",
        theme: theme ?? "dark",
        templateTitle,
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "0 5rem",
                    backgroundColor: query.theme === "dark" ? "#222" : "#fff",
                }}
            >
                {query.templateTitle ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "60px",
                                fontWeight: 700,
                                color:
                                    query.theme === "dark" ? "#fff" : "#000",
                                margin: 0,
                            }}
                        >
                            <span
                                style={{
                                    backgroundImage:
                                        "linear-gradient(90deg, #fd004c, #fe9000, #3edf4b, #3363ff, #b102b7)",
                                    backgroundClip: "text",
                                    color: "transparent",
                                    padding: "0.5rem 0",
                                } as CSSProperties}
                            >
                                {query.templateTitle}
                            </span>
                        </h1>
                        <h3
                            style={{
                                fontSize: "28px",
                                fontWeight: 700,
                                color:
                                    query.theme === "dark"
                                        ? "#d1d5db"
                                        : "#374151",
                                marginTop: "16px",
                            }}
                        >
                            {query.siteName}
                        </h3>
                    </div>
                ) : (
                    <h1
                        style={{
                            fontSize: "60px",
                            fontWeight: 700,
                            color: query.theme === "dark" ? "#fff" : "#000",
                            margin: 0,
                        }}
                    >
                        <span
                            style={{
                                backgroundImage:
                                    "linear-gradient(90deg, #fd004c, #fe9000, #3edf4b, #3363ff, #b102b7)",
                                backgroundClip: "text",
                                color: "transparent",
                                padding: "0.5rem 0",
                            } as CSSProperties}
                        >
                            {query.siteName}
                        </span>
                    </h1>
                )}
                <p
                    style={{
                        fontSize: "32px",
                        color: query.theme === "dark" ? "#d1d5db" : "#1f2937",
                        marginTop: "24px",
                        maxWidth: "900px",
                    }}
                >
                    {query.description}
                </p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}
