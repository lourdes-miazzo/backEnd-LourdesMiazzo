import { Router } from 'express';
import { list, oneRole, saveRole, updateRole, deleteRole } from '../controllers/roleControllers.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const roleRouter = Router();

roleRouter.get('/', auth, authorization('getRoles'),  list);
roleRouter.get('/:id', auth, authorization('getRole'), oneRole);
roleRouter.post('/', auth, authorization('postRole'), saveRole);
roleRouter.put('/:id', auth, authorization('putRole'), updateRole);
roleRouter.delete('/:id',  auth, authorization('deleteRole'), deleteRole);

export default roleRouter;
