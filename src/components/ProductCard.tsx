import type { Product } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { PriceTag } from "./PriceTag"
import Image from "next/image"
import { Badge } from "./ui/badge"
import Link from "next/link"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7

    return (
        <Card className="hover:shadow-xl transition-shadow max-w-sm">
            <Link href={"/products/" + product.id}>
                <CardHeader>
                    <figure>
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={800}
                            height={400}
                            className="h-48 object-cover rounded-t-lg"
                        />
                    </figure>
                </CardHeader>

                <CardContent className="space-y-2">
                    <CardTitle>
                        {product.name}
                    </CardTitle>
                    {isNew && <Badge>NEW</Badge>}
                    <CardDescription className="line-clamp-6">
                        {product.description}
                    </CardDescription>
                    <PriceTag
                        price={product.price}
                    />
                </CardContent>
            </Link>
        </Card>
    )
}
