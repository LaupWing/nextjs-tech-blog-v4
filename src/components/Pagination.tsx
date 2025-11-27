"use client"
import type { FC } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) return null

    return (
        <div className="mt-8 flex items-center justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded cursor-pointer border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0e0e0e] text-gray-600 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.03] active:scale-[0.97] transition duration-100"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
                currentPage === page ? (
                    <div key={page} className="gradient-animation rounded p-[2px]">
                        <button
                            onClick={() => onPageChange(page)}
                            className="px-3 py-1 min-w-[40px] rounded cursor-pointer font-bold bg-white dark:bg-[#0e0e0e] text-gray-600 dark:text-gray-200"
                        >
                            {page}
                        </button>
                    </div>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className="px-3 py-1 min-w-[40px] rounded cursor-pointer font-bold border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0e0e0e] text-gray-600 dark:text-gray-200 hover:scale-[1.03] active:scale-[0.97] transition duration-100"
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded cursor-pointer border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0e0e0e] text-gray-600 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.03] active:scale-[0.97] transition duration-100"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    )
}
