import Image from "next/image"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import { TechIcons } from "./TechIcons.client"
import { TweetCard } from "./cards/TweetCard"
import { GithubCard } from "./cards/GithubCard.client"
import { CloudinaryImage } from "./CloudinaryImage.client"
import { CustomLink } from "./CustomLink"
import { CustomCode } from "./CustomCode.client"
import { Pre } from "./Pre"
import { Split } from "./Split"
import { SplitImage } from "./SplitImage"

export const MDXComponents = {
    a: CustomLink,
    CustomLink,
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
