'use client'

import { buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CartItemWithProduct } from "@/lib/db/cart"
import { formatPrice } from "@/lib/format"
import { SelectGroup } from "@radix-ui/react-select"
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
            <SelectItem
                key={i}
                value={i}
            >
                {i}
            </SelectItem>
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
                        <Select
                            defaultValue={quantity}
                            onValueChange={(value) => {
                                const newQuantity = parseInt(value);

                                startTransition(async () => {
                                    await setProductQuantity(product.id, newQuantity);
                                });
                            }}
                        >
                            <SelectTrigger
                                className={buttonVariants({
                                    variant: 'outline',
                                })}
                            >
                                <SelectValue placeholder={quantity} />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup className="h-40 scrollbar-w-2 overflow-y-scroll pr-1">
                                    <SelectItem value={0} className="bg-red-300">Remover</SelectItem>
                                    {quantityOptions}
                                </SelectGroup>
                            </SelectContent>

                        </Select>
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
