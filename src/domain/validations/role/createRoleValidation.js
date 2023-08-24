import z from 'zod';

const createRoleValidation = z.object({
    name: z.string(),
    permissions: z.array(z.string())
});

export default createRoleValidation;
