import { ShoppingCart } from "@/lib/db/cart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import { formatPrice } from "@/lib/format"
import Link from "next/link"
import { buttonVariants } from "../ui/button"

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null
}

export function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative p-2 rounded-full hover:bg-zinc-300">

                <ShoppingCartIcon />

                <Badge className="absolute top-0 px-1.5 py-0 bg-white text-primary hover:bg-secondary/90">
                    {cart?.size || 0}
                </Badge>

            </DropdownMenuTrigger>

            <DropdownMenuContent className="px-2 py-1.5 rounded-lg">
                <DropdownMenuLabel className="px-1 text-base">{cart?.size} Items</DropdownMenuLabel>

                <span className="flex items-center px-1 text-sm text-muted-foreground">Subtotal: {formatPrice(cart?.subtotal || 0)}</span>

                <DropdownMenuItem asChild>
                    <Link
                        href='/cart'
                        className={buttonVariants({
                            size: 'sm',
                            className: "w-full px-8 mt-3"
                        })}
                    >
                        Ver carrinho
                    </Link>
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}
