import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/db/prisma"
import { stripe } from "@/lib/stripe"
import { getServerSession } from "next-auth"
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


    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl">Obrigado pela compra</h1>
        </div>
    )
}
