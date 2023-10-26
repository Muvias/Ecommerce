import { PriceTag } from "@/components/PriceTag"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"
import AddToCartButton from "./AddToCartButton"
import { incrementProductQuantity } from "./actions"

interface pageProps {
    params: {
        id: string
    }
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    })

    if (!product) notFound()

    return product
})

export async function generateMetadata({ params: { id } }: pageProps): Promise<Metadata> {
    const product = await getProduct(id)

    return {
        title: product.name + " - Ecommerce",
        description: product.description,
        openGraph: {
            images: [{
                url: product.imageUrl
            }]
        }
    }
}

export default async function page({ params: { id } }: pageProps) {
    const product = await getProduct(id)

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 bg-white rounded-lg">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg"
                priority
            />

            <div>
                <h1 className="text-5xl font-bold">
                    {product.name}
                </h1>

                <PriceTag price={product.price} className="mt-4" />

                <p className="py-6 pr-4">{product.description}</p>

                <AddToCartButton
                    productId={product.id}
                    incrementProductQuantity={incrementProductQuantity}
                />
            </div>
        </div>
    )
}
