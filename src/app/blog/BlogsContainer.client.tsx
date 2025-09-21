"use client"
import type { BlogFrontmatter, InjectedMeta } from "@/types/frontmatters"
import type { ChangeEvent, FC } from "react"

import { IconCalendar, IconEye } from "@/components/Icons"
import { BlogCard } from "@/components/cards/BlogCard"
// import {
//     SortListBox,
//     SortOption,
// } from "@/components/elements/SortListBox.client"
import { getTags } from "@/lib/mdx-client"
import { useEffect, useState } from "react"
import { Tag } from "@/components/Tag"
import { ContentPlaceholder } from "@/components/ContentPlaceholder"
import { getFromSessionStorage } from "@/lib/helper"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface BlogsContainerProps {
    posts: Array<BlogFrontmatter & InjectedMeta>
}

interface SortOption {
    id: "date" | "views"
    label: string
    value: string
    icon: FC
}

const sortOptions: Array<SortOption> = [
    {
        id: "date",
        label: "Sort by date",
        value: "date",
        icon: IconCalendar,
    },
    {
        id: "views",
        label: "Sort by views",
        value: "views",
        icon: IconEye,
    },
]

export const BlogsContainer: FC<BlogsContainerProps> = ({ posts }) => {
    const [sortOrder, setSortOrder] = useState<SortOption>(
        () => sortOptions[Number(getFromSessionStorage("blog-sort")) || 0]
    )
    const tags = getTags(posts)
    const [search, setSearch] = useState<string>("")
    const [filteredPosts, setFilteredPosts] = useState<
        Array<BlogFrontmatter & InjectedMeta>
    >(() => [...posts])

    useEffect(() => {
        const result = posts
            .filter(
                (post) =>
                    post.title.toLowerCase().includes(search.toLowerCase()) ||
                    post.description
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    search
                        .toLowerCase()
                        .split(" ")
                        .every((tag) => post.tags.includes(tag))
            )
            .sort((a, b) => {
                if (sortOrder.id === "date") {
                    return (
                        new Date(b.publishedAt).getTime() -
                        new Date(a.publishedAt).getTime()
                    )
                } else {
                    return b.views! - a.views!
                }
            })
        setFilteredPosts(result)
    }, [search, sortOrder])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const toggleTag = (tag: string) => {
        if (search.includes(tag)) {
            setSearch((s) =>
                s
                    .split(" ")
                    .filter((t) => t !== tag)
                    .join(" ")
            )
        } else {
            setSearch((s) => (s !== "" ? `${s.trim()} ${tag}` : tag))
        }
    }

    const filteredTags = getTags(filteredPosts)
    const tagFoundInSearch = (tag: string) => search.includes(tag)

    return (
        <>
            <div data-fade="3">
                <Input
                    type="search"
                    className="w-full mt-4"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            <div
                className="mt-2 flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                data-fade="4"
            >
                <span className="font-medium">Choose topic:</span>
                {tags.map((tag: string) => (
                    <Tag
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        disabled={!filteredTags.includes(tag)}
                        active={tagFoundInSearch(tag)}
                    >
                        {tag}
                    </Tag>
                ))}
            </div>
            <div className="mt-4 flex justify-end" data-fade="5">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort By</SelectLabel>
                            {sortOptions.map((option) => (
                                <SelectItem
                                    key={option.id}
                                    value={option.value}
                                    onSelect={() => {
                                        setSortOrder(option)
                                        window.sessionStorage.setItem(
                                            "blog-sort",
                                            sortOptions
                                                .indexOf(option)
                                                .toString()
                                        )
                                    }}
                                >
                                    <option.icon /> {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <ul
                className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                data-fade="6"
            >
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))
                ) : (
                    <ContentPlaceholder />
                )}
            </ul>
        </>
    )
}
