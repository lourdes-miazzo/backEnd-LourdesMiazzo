import z from "zod"

const createProductValidation = z.object({
    title: z.string(), 
    description: z.string(),
    price: z.number(),
    thumbnail: z.string(),
    code: z.string(),
    stock: z.number(),
    category: z.string(),
    status: z.boolean()
})

export default createProductValidation