import { getCart } from "@/lib/db/cart"
import { CartEntry } from "./CartEntry"
import { setProductQuantity } from "./actions"

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
        </div>
    )
}
