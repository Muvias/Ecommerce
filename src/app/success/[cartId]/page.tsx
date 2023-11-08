import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/db/prisma"
import { stripe } from "@/lib/stripe"
import { format } from "date-fns"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

interface pageProps {
    params: {
        cartId: string
    }
}

export default async function Page({ params: { cartId } }: pageProps) {
    const session = await getServerSession(authOptions)

    if (!session) redirect('/')

    await prisma.cart.update({
        where: {
            id: cartId,
            userId: session.user.id
        },
        data: {
            items: {
                deleteMany: {}
            }
        }
    })

    const user = await prisma.user.findFirst({
        where: {
            id: session.user.id
        }
    })

    if (!user?.stripeCustomerID) return null

    const purchases = await stripe.charges.list({
        customer: user.stripeCustomerID,
    })

    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl">Obrigado pela compra</h1>

            <div className="flex flex-col text-start space-y-4">
                <h2 className="text-2xl my-4 font-medium">Suas compras:</h2>
                {purchases.data.map(purchase => (
                    <div className="flex items-start gap-4 w-fit p-2 rounded-md bg-white text-muted-foreground shadow-md" key={purchase.id}>
                        <span>R$ {(purchase.amount / 100).toFixed(2).replace('.', ',')}</span>
                        <time>{format(new Date(purchase.created * 1000), "dd/MM/yyyy")}</time>
                        <Link className="font-semibold text-blue-500 hover:text-blue-600" href={purchase.receipt_url || ''} target="__blank">Recibo</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
