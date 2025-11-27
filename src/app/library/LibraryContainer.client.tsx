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
import { Pagination } from "@/components/Pagination"

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

const POSTS_PER_PAGE = 12

export const LibraryContainer: FC<LibraryContainerProps> = ({ posts }) => {
    const [sortOrder, setSortOrder] = useState<string>(() =>
        getFromSessionStorage("library-sort")
            ? sortOptions.find(
                  (x) => x.id === getFromSessionStorage("library-sort")
              )?.id!
            : sortOptions[0].id
    )
    const [search, setSearch] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(1)
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
        setCurrentPage(1)
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

    // Pagination logic
    const totalPages = Math.ceil(filtered_posts.length / POSTS_PER_PAGE)
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    const paginatedPosts = filtered_posts.slice(startIndex, endIndex)

    const goToPage = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

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
                <Select
                    value={sortOrder}
                    onValueChange={(value) => {
                        setSortOrder(value)
                        window.sessionStorage.setItem("library-sort", value)
                    }}
                >
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
                                >
                                    <option.icon /> {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <ul
                key={currentPage}
                className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in"
            >
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
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

            {/* Pagination */}
            <div data-fade="6">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />
            </div>

            {/* Results info */}
            {filtered_posts.length > 0 && (
                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Showing {startIndex + 1}-{Math.min(endIndex, filtered_posts.length)} of {filtered_posts.length} snippets
                </p>
            )}
        </>
    )
}
