import z from 'zod';

const idValidation = z.string().length(24);

export default idValidation;
