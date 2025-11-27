import clsx from "clsx"
import { ImageResponse } from "next/og"
import { CSSProperties } from "react"

const inter400 = fetch(
    new URL("@/assets/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const inter700 = fetch(
    new URL("@/assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export const runtime = "edge"

export async function GET(request: Request) {
    const interRegular = await inter400
    const interBold = await inter700

    const { searchParams } = new URL(request.url)

    const siteName = searchParams.get("siteName")
    const description = searchParams.get("description")
    const theme = searchParams.get("theme")
    const logo = searchParams.get("logo")
    const templateTitle = searchParams.get("templateTitle")
    const logoWidth = searchParams.get("logoWidth")
    const logoHeight = searchParams.get("logoHeight")

    const query = {
        siteName: siteName ?? "Loc Nguyen",
        description: description ?? "Full-Stack Developer",
        theme: theme ?? "dark",
        logo: logo ?? `${process.env.SITE_URL}/images/logo.png`,
        templateTitle,
        logoWidth: logoWidth ? +logoWidth : 100,
        logoHeight: logoHeight ? +logoHeight : 100,
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    fontFamily: "Inter",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "0 5rem",
                    backgroundColor: query.theme === "dark" ? "#222" : "#fff",
                }}
            >
                <img
                    style={{
                        width: query.logoWidth,
                        ...(query.logoHeight && { height: query.logoHeight }),
                    }}
                    src={query.logo}
                    alt="Favicon"
                />
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
                                marginTop: "2rem",
                                fontSize: "3.75rem",
                                fontWeight: 700,
                                color:
                                    query.theme === "dark" ? "#fff" : "#000",
                            }}
                        >
                            <span
                                style={{
                                    backgroundImage:
                                        "linear-gradient(90deg, #fd004c, #fe9000, #3edf4b, #3363ff, #b102b7)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                    padding: "0.5rem 0",
                                } as CSSProperties}
                            >
                                {query.templateTitle}
                            </span>
                        </h1>
                        <h3
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                color:
                                    query.theme === "dark"
                                        ? "#d1d5db"
                                        : "#374151",
                            }}
                        >
                            {query.siteName}
                        </h3>
                    </div>
                ) : (
                    <h1
                        style={{
                            marginTop: "1.5rem",
                            fontSize: "3.75rem",
                            fontWeight: 700,
                            color: query.theme === "dark" ? "#fff" : "#000",
                        }}
                    >
                        <span
                            style={{
                                backgroundImage:
                                    "linear-gradient(90deg, #fd004c, #fe9000, #3edf4b, #3363ff, #b102b7)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
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
                        fontSize: "1.875rem",
                        color: query.theme === "dark" ? "#d1d5db" : "#1f2937",
                    }}
                >
                    {query.description}
                </p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            emoji: "twemoji",
            fonts: [
                {
                    name: "Inter",
                    data: interRegular,
                    weight: 400,
                },
                {
                    name: "Inter",
                    data: interBold,
                    weight: 700,
                },
            ],
        }
    )
}
