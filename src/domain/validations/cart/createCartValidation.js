import z from 'zod';

const createCartValidation = z.object({
    products: z.array({
        id: z.string().length(24),
        quantity: z.number()
    })
});

export default createCartValidation;
