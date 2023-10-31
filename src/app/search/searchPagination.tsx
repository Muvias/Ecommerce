import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

interface PaginationBarProps {
    currentPage: number
    totalPages: number
    query: string
}

export function SearchPagination({ currentPage, totalPages, query }: PaginationBarProps) {
    const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10))
    const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9))

    const numberedPageItems: JSX.Element[] = []

    for (let page = minPage; page <= maxPage; page++) {
        numberedPageItems.push(
            <Link
                href={`?query=${query}&page=${page}`}
                key={page}
                className={cn(buttonVariants({
                    variant: 'outline',
                }), {
                    "bg-primary text-primary-foreground pointer-events-none": currentPage === page
                })}
            >
                {page}
            </Link>
        )
    }

    return (
        <>
            <div className="hidden sm:flex justify-center">
                {numberedPageItems}
            </div>

            <div className="flex sm:hidden justify-center items-center bg-white w-fit mx-auto rounded">
                {currentPage > 1 && (
                    <Link
                        href={`?query=${query}&page=${currentPage - 1}`}
                        className={buttonVariants({ variant: 'ghost', className: "hover:bg-white" })}
                    >
                        <ChevronsLeft />
                    </Link>
                )}

                <Button variant={'ghost'} className="pointer-events-none">
                    Pág. {currentPage}
                </Button>

                {currentPage < totalPages && (
                    <Link
                        href={`?query=${query}&page=${currentPage + 1}`}
                        className={buttonVariants({ variant: 'ghost', className: "hover:bg-white" })}
                    >
                        <ChevronsRight />
                    </Link>
                )}
            </div>
        </>
    )
}
