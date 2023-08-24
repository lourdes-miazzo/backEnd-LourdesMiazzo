import z from 'zod';

const emailValidation = z.string().email();

export default emailValidation;
