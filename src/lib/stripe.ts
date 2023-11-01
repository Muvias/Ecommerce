import Stripe from 'stripe'
import { prisma } from './db/prisma'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-10-16',
  typescript: true,
})

export async function sendProductToStripe() {
  const products = await prisma.product.findMany()

  return console.log(products)
}