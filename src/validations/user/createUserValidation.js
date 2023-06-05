import z from "zod"

const createUserValidation= z.object({
    firstName: z.string().max(20),
    lastName: z.string().max(30),
    email: z.string().email(),
    age: z.number(),
    password: z.string(), 
    cart: z.string().length(24).optional(),
    role: z.array(z.string()).optional(),
    isAdmin: z.boolean().optional()
})

export default createUserValidation