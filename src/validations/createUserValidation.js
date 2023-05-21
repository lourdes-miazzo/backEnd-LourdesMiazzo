import z from "zod"

const createUserValidation= z.object({
    firstName: z.string().max(20),
    lastName: z.string().max(20),
    email: z.string().email(),
    age: z.number(),
    password: z.string() 
})

export default createUserValidation