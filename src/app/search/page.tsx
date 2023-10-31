import { ProductCard } from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"
import { SearchPagination } from "./searchPagination"

interface pageProps {
    searchParams: { query: string, page: string }
}

export function generateMetadata({ searchParams: { query } }: pageProps): Metadata {
    return {
        title: query + " - Ecommerce",
    }
}

export default async function page({ searchParams: { query, page = '1' } }: pageProps) {
    const totalItemCount = await prisma.product.count({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ]
        }
    })

    const currentPage = parseInt(page)
    const pageSize = (currentPage === 1 ? 6 : 9)

    const totalPages = Math.ceil(totalItemCount / 9)

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ]
        },
        orderBy: { id: 'desc' },
        skip: (currentPage - 1) * pageSize,
        take: pageSize + 0
    })

    if (products.length === 0) {
        return <div className="text-center">Nenhum produto encontrado</div>
    }

    return (
        <>
            <div className="flex justify-center flex-wrap gap-4 my-4">
                {products.map(product => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>

            <SearchPagination query={query} currentPage={currentPage} totalPages={totalPages} />
        </>
    )
}
