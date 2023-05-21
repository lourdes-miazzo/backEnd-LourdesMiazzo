import z from "zod"

const pidValidation =  z.string().max(24)


export default pidValidation