import { stripe } from "@/lib/stripe";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { TRPCError } from "@trpc/server";

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
            const billingUrl = "https://ecommerce-muvias.vercel.app/";
            const cart = await getCart()

            if (!cart?.userId) throw new TRPCError({ code: "UNAUTHORIZED" })

            const { input } = ctx;

            const dbUser = await prisma.user.findFirst({
                where: {
                    id: cart.userId,
                },
            })

            if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" })

            if (!dbUser.stripeID) {
                const stripeSession = await stripe.checkout.sessions.create({
                    success_url: `${billingUrl}/success/${cart.id}`,
                    payment_method_types: ["card"],
                    mode: "payment",
                    billing_address_collection: "required",
                    line_items: input.items,
                    customer_creation: "always",
                    metadata: {
                        userId: dbUser.id
                    }
                })

                return { url: stripeSession.url };
            }

            const stripeSession = await stripe.checkout.sessions.create({
                success_url: `${billingUrl}/success/${cart.id}`,
                payment_method_types: ["card"],
                mode: "payment",
                billing_address_collection: "required",
                line_items: input.items,
                metadata: {
                    userId: dbUser.id
                }
            })

            return { url: stripeSession.url }
        }),
})

export type AppRouter = typeof appRouter