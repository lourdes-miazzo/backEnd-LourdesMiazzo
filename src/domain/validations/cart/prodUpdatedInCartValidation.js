import z from 'zod';
import idValidation from '../idValidation.js';
import pidValidation from '../product/pidValidation.js';
import createCartValidation from './createCartValidation.js';

const productUpdatedIncartValidation = z.union([
    idValidation,
    pidValidation,
    createCartValidation
]);

export default productUpdatedIncartValidation;
