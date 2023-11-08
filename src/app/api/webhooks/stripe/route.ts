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
        return new Response(
            `Webhook Error: ${error instanceof Error ? error.message : 'Unknown Error'
            }`,
            { status: 400 }
        )
    }

    const eventData = event.data.object as Stripe.Checkout.Session

    if (!eventData.metadata?.userId) {
        return new Response(null, { status: 204 })
    }

    const user = await prisma.user.findFirst({
        where: {
            id: eventData.metadata.userId
        }
    })

    if (event.type === 'checkout.session.completed') {
        const customerID = eventData.customer?.toString()

        if(!user?.stripeCustomerID) {
            if (!customerID) return new Response('No customer ID', { status: 500 })

            await prisma.user.update({
                where: {
                    id: eventData.metadata.userId
                },
                data: {
                    stripeCustomerID: customerID,
                }
            })
        }
    }

    return new Response('OK', { status: 200 })
}