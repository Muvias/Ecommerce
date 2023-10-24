'use client'

import { Button } from "@/components/ui/button"
import { Loader2, ShoppingCart } from "lucide-react"
import { useState, useTransition } from "react"

interface AddToCartButtonProps {
    productId: string
    incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({ productId, incrementProductQuantity }: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)

    return (
        <div className="flex items-center gap-2">
            <Button
                onClick={() => {
                    setSuccess(false)

                    startTransition(async () => {
                        await incrementProductQuantity(productId)

                        setSuccess(true)
                    })
                }}
            >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Adicionar ao carrinho
            </Button>

            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {!isPending && success && <span className="text-[#11C700]">Added to Cart</span>}
        </div>
    )
}
