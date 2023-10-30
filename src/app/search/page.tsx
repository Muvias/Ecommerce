import { ProductCard } from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"

interface pageProps {
    searchParams: { query: string }
}

export function generateMetadata({ searchParams: { query } }: pageProps): Metadata {
    return {
        title: query + " - Ecommerce",
    }
}

export default async function page({ searchParams: { query } }: pageProps) {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ]
        },
        orderBy: { id: 'desc' }
    })

    if (products.length === 0) {
        return <div className="text-center">Nenhum produto encontrado</div>
    }

    return (
        <div className="flex justify-center flex-wrap gap-4 my-4">
            {products.map(product => (
                <ProductCard product={product} />
            ))}
        </div>
    )
}
