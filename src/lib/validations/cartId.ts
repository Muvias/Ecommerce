import { z } from 'zod'

export const cartIdValidator = z.object({
    id: z.string()
})