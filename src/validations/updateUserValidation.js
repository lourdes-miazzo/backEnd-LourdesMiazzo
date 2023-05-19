import z from "zod"

const updateUserValidation = z.object({
    uid: z.string().max(24),
    firstName: z.string().max(20),
    lastName: z.string().max(20),
    email: z.string().email(),
    age: z.number()
})

export default updateUserValidation