'use client'

import { buttonVariants } from "@/components/ui/button"
import { CartItemWithProduct } from "@/lib/db/cart"
import { formatPrice } from "@/lib/format"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTransition } from "react"

interface CartEntryProps {
    cartItem: CartItemWithProduct
    setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

export function CartEntry({ cartItem: { product, quantity }, setProductQuantity }: CartEntryProps) {
    const [isPending, startTransition] = useTransition()

    const quantityOptions: JSX.Element[] = []

    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <option
                key={i}
                value={i}
                className="mx-0"
            >
                {i}
            </option>
        )
    }

    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
                <div>
                    <Link href={'/products/' + product.id} className="font-bold">
                        {product.name}
                    </Link>

                    <div>
                        Preço: {formatPrice(product.price)}
                    </div>

                    <div className="flex items-center my-1 gap-2">
                        Quantidade:
                        <select
                            className={buttonVariants({
                                variant: 'outline',
                                className: "scrollbar-w-2"
                            })}
                            defaultValue={quantity}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.currentTarget.value);

                                startTransition(async () => {
                                    await setProductQuantity(product.id, newQuantity);
                                });
                            }}
                        >
                            <option value={0} className="bg-red-300">Remover</option>
                            {quantityOptions}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        Total: {formatPrice(product.price * quantity)}
                        
                        {isPending && <Loader2 className="animate-spin" />}
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-zinc-200 my-4" />
        </div>
    )
}
