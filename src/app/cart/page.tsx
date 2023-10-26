import { getCart } from "@/lib/db/cart"
import { CartEntry } from "./CartEntry"
import { setProductQuantity } from "./actions"
import { Ghost } from "lucide-react"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"

interface pageProps { }

export const metadata = {
    title: "Seu carrinho - Ecommerce"
}

export default async function page({ }: pageProps) {
    const cart = await getCart()

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Carrinho de compras
            </h1>

            {cart?.items.map((cartItem) => (
                <CartEntry
                    cartItem={cartItem}
                    setProductQuantity={setProductQuantity}
                />
            ))}

            {!cart?.items.length && <p className="flex items-center gap-2 text-xl">Seu carrinho está vazio <Ghost /></p>}

            {cart?.subtotal !== 0 && (
                <div className="flex flex-col items-end">
                        <p className="font-bold mt-4 mb-3">
                            Total: {formatPrice(cart?.subtotal || 0)}
                        </p>

                        <Button>
                            Concluir
                        </Button>
                </div>
            )}
        </div >
    )
}
