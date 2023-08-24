import z from 'zod';
import createProductValidation from './createProductValidation.js';
import pidValidation from './pidValidation.js';

const updateProductValidation = z.union([
    pidValidation,
    createProductValidation
]);

export default updateProductValidation;
