import z from "zod"

const updateProductValidation= z.object({
    pid: z.string().max(24),  
    title: z.string(), 
    description: z.string(),
    price: z.number(),
    thumbnail: z.string(),
    code: z.string(),
    stock: z.number(),
    category: z.string(),
    status: z.boolean()
})

export default updateProductValidation