import z from "zod"

const idValidation= z.object({
    uid: z.string().max(24)
})

export default idValidation