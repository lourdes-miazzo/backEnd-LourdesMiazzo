import z from 'zod';
import idValidation from '../idValidation.js';
import createCartValidation from './createCartValidation.js';

const updateCartValidation = z.union([
    idValidation,
    createCartValidation
]);
export default updateCartValidation;
