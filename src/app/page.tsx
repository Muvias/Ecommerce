import { ProductCard } from "@/components/ProductCard"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc"
    }
  })

  return (
    <div>
      <Card className="px-0 py-6 sm:px-6 mb-8 bg-white flex flex-col lg:flex-row lg:items-center gap-8">
        <CardHeader className="w-full pb-0">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={800}
            className="w-full max-w-xs mx-auto rounded-lg shadow-2xl"
            priority
          />
        </CardHeader>

        <CardContent>
          <CardTitle className="text-5xl truncate">{products[0].name}</CardTitle>
          <CardContent className="px-0 py-6">{products[0].description}</CardContent>
          <Link
            className={buttonVariants()}
            href={"/products/" + products[0].id}
          >
            Confira
          </Link>
        </CardContent>
      </Card>

      <div className="flex justify-around flex-wrap my-4 gap-8">
        {products.slice(1).map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
