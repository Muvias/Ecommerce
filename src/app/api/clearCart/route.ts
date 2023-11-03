import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { cartIdValidator } from "@/lib/validations/cartId";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) throw new Response('Unauthorized', { status: 401 })

        const body = await req.json()
        const { id: cartId } = cartIdValidator.parse(body.email)

        await prisma.cart.update({
            where: { id: cartId },
            data: {
                items: {
                    deleteMany: {},
                },
            },
        });

        return new Response('OK')
    } catch (error) {
        return new Response('Internal Error', { status: 500 })
    }
}