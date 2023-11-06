import { stripe } from "@/lib/stripe";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";

export const appRouter = router({
    createStripeSession: publicProcedure
        .input(
            z.object({
                items: z.array(
                    z.object({
                        price_data: z.object({
                            unit_amount: z.number(),
                            product: z.string(),
                            currency: z.string()
                        }),
                        quantity: z.number(),
                    })
                ),
            })
        )
        .mutation(async (ctx) => {
            const billingUrl = "http://localhost:3000";
            const cart = await getCart()

            if (!cart?.userId) return null

            const { input } = ctx;

            const stripeSession = await stripe.checkout.sessions.create({
                success_url: `${billingUrl}/success/${cart?.id}`,
                payment_method_types: ["card"],
                mode: "payment",
                billing_address_collection: "required",
                line_items: input.items,
            });

            return { url: stripeSession.url };
        }),
})

export type AppRouter = typeof appRouter