import type { FC } from "react"
import clsx from "clsx"
import { Tweet } from "react-tweet"

interface TweetCardProps {
    className?: string
    tweetId: string
}

export const TweetCard: FC<TweetCardProps> = ({ tweetId, className }) => {
    return (
        <div className={clsx("not-prose w-[99%]", className)}>
            <Tweet id={tweetId} />
        </div>
    )
}
