import { prisma } from '@/lib/db/prisma'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import type Stripe from 'stripe'

export async function POST(request: Request) {
    const body = await request.text()
    const signature = headers().get('Stripe-Signature') ?? ''

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ''
        )
    } catch (error) {
        console.error('Erro na verificação da assinatura:', error)
        return {
            status: 400,
            body: 'Erro na verificação da assinatura do webhook.',
        }
    }

    const eventData = event.data.object as Stripe.Checkout.Session

    if (!eventData.metadata?.userId) {
        return new Response(null, { status: 200 })
    }

    if (event.type === 'checkout.session.completed') {
        const customerID = eventData.customer?.toString()

        if (!customerID) return new Response('No customer ID', { status: 500 })

        await prisma.user.update({
            where: {
                id: eventData.metadata.userId
            },
            data: {
                stripeID: customerID
            }
        })

        console.log("Checkout")
    }


    return new Response('OK', { status: 200 })
}