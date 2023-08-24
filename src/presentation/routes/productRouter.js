import { Router } from 'express';
import { deleteOne, getList, getOne, saveNew, update } from '../controllers/productsController.js';
import auth from '../middlewares/auth.js';
import { authorizationAdminAndPremium } from '../middlewares/authorizationAdminAndPremium.js';
import { authorizationAdminAndPremium2 } from '../middlewares/authorizationAdminAndPremium2.js';

const productRouter = Router();

productRouter.get('/', getList);
productRouter.get('/:pid', getOne);
productRouter.post('/', auth, authorizationAdminAndPremium, saveNew);
productRouter.put('/:pid', auth, authorizationAdminAndPremium2, update);
productRouter.delete('/:pid', auth, authorizationAdminAndPremium2, deleteOne);

export default productRouter;
