import z from 'zod';

const pidValidation =  z.string().length(24);

export default pidValidation;
