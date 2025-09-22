import { CustomLink } from "./links/CustomLink"
import Image from "next/image"
import { CustomCode } from "./sections/CustomCode.client"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import { Pre } from "./sections/Pre"
import { SplitImage } from "./sections/SplitImage"
import { Split } from "./sections/Split"
import { TechIcons } from "./TechIcons.client"
import { TweetCard } from "./cards/TweetCard"
import { GithubCard } from "./cards/GithubCard.client"
import { CloudinaryImage } from "./CloudinaryImage.client"

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
