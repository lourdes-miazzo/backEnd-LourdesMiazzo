import z from "zod"

const idValidation= z.string().max(24)

export default idValidation