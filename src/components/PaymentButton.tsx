'use client'

import { trpc } from "@/app/_trpc/client"
import { Button } from "./ui/button"
import { ShoppingCart } from "@/lib/db/cart"
import { prisma } from "@/lib/db/prisma"

interface paymentButtonProps {
    cart: ShoppingCart | null
}

interface cartItem {
    quantity: number,
    product: {
        id: string
        price: number
    };
}

export function PaymentButton({ cart }: paymentButtonProps) {
    const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
        onSuccess: async ({ url }) => {
            window.location.href = url ?? "/"
        },
    })

    const convertCartItemsToStripeFormat = (cartItems: cartItem[]) => {
        return cartItems.map((item) => ({
            price_data: {
                unit_amount: item.product.price,
                product: item.product.id,
                currency: "brl",
            },
            quantity: item.quantity,
        }));
    };

    return (
        <Button onClick={() => {
            if (cart) {
                const items = convertCartItemsToStripeFormat(cart.items);
                createStripeSession({ items });
            }
        }}>
            Concluir
        </Button>
    )
}
