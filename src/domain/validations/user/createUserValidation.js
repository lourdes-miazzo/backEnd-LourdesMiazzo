import z from 'zod';

const createUserValidation = z.object({
    firstName: z.string().max(20),
    lastName: z.string().max(30),
    email: z.string().email(),
    age: z.number(),
    password: z.string(),
    isAdmin: z.boolean().optional(),
    lastConnection: z.date().optional(),
    terminal: z.boolean().optional()
});

export default createUserValidation;
