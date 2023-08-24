import z from 'zod';
import idValidation from '../idValidation.js';
import createRoleValidation from './createRoleValidation.js';

const updateRoleValidation = z.union([
    idValidation,
    createRoleValidation
]);
export default updateRoleValidation;
