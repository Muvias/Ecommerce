import { PaginationBar } from "@/components/PaginationBar"
import { ProductCard } from "@/components/ProductCard"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import Link from "next/link"

interface HomeProps {
  searchParams: { page: string }
}

export default async function Home({ searchParams: { page = "1" } }: HomeProps) {
  const totalItemCount = await prisma.product.count()
  const heroItemCount = 1

  const currentPage = parseInt(page)
  const pageSize = (currentPage === 1 ? 6 : 9)

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize)

  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0)
  })

  return (
    <div>
      {currentPage === 1 && (
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
            <CardContent className="px-0 py-6 line-clamp-6">{products[0].description}</CardContent>
            <Link
              className={buttonVariants()}
              href={"/products/" + products[0].id}
            >
              Confira
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-around flex-wrap my-4 gap-8">
        {(currentPage === 1 ? products.slice(1) : products).map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}
