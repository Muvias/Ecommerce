import { stripe } from "@/lib/stripe";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

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

            const { input } = ctx;

            const stripeSession = await stripe.checkout.sessions.create({
                success_url: billingUrl,
                payment_method_types: ["card"],
                mode: "payment",
                billing_address_collection: "required",
                line_items: input.items,
            });

            return { url: stripeSession.url };
        }),
})

export type AppRouter = typeof appRouter