"use client"
import type { ChangeEvent, FC } from "react"
import type { InjectedMeta, LibraryFrontmatter } from "@/types/frontmatters"

import { ChadIcon } from "@/components/ChadIcon"
import { IconSortAscending } from "@/components/Icons"
import { LibraryCard } from "@/components/cards/LibraryCard"
import { getTags } from "@/lib/mdx-client"
import { useEffect, useState } from "react"
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
import { Tag } from "@/components/Tag"
import { ContentPlaceholder } from "@/components/ContentPlaceholder"
import { Input } from "@/components/ui/input"

interface LibraryContainerProps {
    posts: Array<LibraryFrontmatter & InjectedMeta>
}

interface SortOption {
    id: "name" | "popular"
    label: string
    icon: FC
}

const sortOptions: Array<SortOption> = [
    {
        id: "name",
        label: "Sort by name",
        icon: IconSortAscending,
    },
    {
        id: "popular",
        label: "Sort by popularity",
        icon: ChadIcon,
    },
]

export const LibraryContainer: FC<LibraryContainerProps> = ({ posts }) => {
    const [sortOrder, setSortOrder] = useState<string>(() =>
        getFromSessionStorage("library-sort")
            ? sortOptions.find(
                  (x) => x.id === getFromSessionStorage("library-sort")
              )?.id!
            : sortOptions[0].id
    )
    const [search, setSearch] = useState<string>("")
    const [filtered_posts, setFilteredPosts] = useState<
        Array<LibraryFrontmatter & InjectedMeta>
    >(() => [...posts])

    useEffect(() => {
        const result = posts
            .filter(
                (post) =>
                    post.title.toLowerCase().includes(search.toLowerCase()) ||
                    search
                        .toLowerCase()
                        .split(" ")
                        .every((tag) => post.tags.includes(tag))
            )
            .sort((a, b) => {
                if (sortOrder === "name") {
                    return a.title.localeCompare(b.title)
                } else {
                    return b.likes! - a.likes!
                }
            })
        setFilteredPosts(result)
    }, [search, sortOrder])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const tags = getTags(posts)
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
    const filtered_tags = getTags(filtered_posts)
    const tagFoundInSearch = (tag: string) => search.includes(tag)

    return (
        <>
            <div data-fade="2">
                <Input
                    type="search"
                    className="w-full mt-4 h-11 px-4"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            <div
                className="mt-2 flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                data-fade="3"
            >
                <span className="font-medium">Choose topic:</span>
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        disabled={!filtered_tags.includes(tag)}
                        active={tagFoundInSearch(tag)}
                    >
                        {tag}
                    </Tag>
                ))}
            </div>
            <div className="mt-4 flex justify-end" data-fade="5">
                <Select value={sortOrder}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort By</SelectLabel>
                            {sortOptions.map((option) => (
                                <SelectItem
                                    key={option.id}
                                    value={option.id}
                                    className="fill-current"
                                    onSelect={() => {
                                        setSortOrder(option.id)
                                        window.sessionStorage.setItem(
                                            "library-sort",
                                            option.id
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
                data-fade="5"
            >
                {filtered_posts.length > 0 ? (
                    filtered_posts.map((post) => (
                        <LibraryCard
                            key={post.slug}
                            snippet={post}
                            search={search}
                        />
                    ))
                ) : (
                    <ContentPlaceholder />
                )}
            </ul>
        </>
    )
}
