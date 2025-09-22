import Image from "next/image"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import { SplitImage } from "./sections/SplitImage"
import { Split } from "./sections/Split"
import { TechIcons } from "./TechIcons.client"
import { TweetCard } from "./cards/TweetCard"
import { GithubCard } from "./cards/GithubCard.client"
import { CloudinaryImage } from "./CloudinaryImage.client"
import { CustomLink } from "./CustomLink"
import { CustomCode } from "./CustomCode.client"
import { Pre } from "./Pre"

export const MDXComponents = {
    a: CustomLink,
    Image,
    CloudinaryImage: CloudinaryImage,
    code: CustomCode,
    pre: Pre,
    LiteYouTubeEmbed,
    Split,
    SplitImage,
    TechIcons,
    TweetCard,
    GithubCard,
}
