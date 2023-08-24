import { Router } from 'express';
import { gelList, getOne, saveProdInCart, deleteProdInCart, purchaseProductsInCart, deleteAllProdInCart, updateCart, updateProdInCart } from '../controllers/cartsController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';


const cartRouter = Router();

cartRouter.get('/', auth, authorization('getCarts'), gelList);
cartRouter.get('/:id', auth, authorization('getCart'), getOne);
cartRouter.post('/:id/products/:pid', auth, authorization('postProdCart'), saveProdInCart);
cartRouter.post('/:id/purchase', auth, authorization('purchase'),  purchaseProductsInCart);
cartRouter.put('/:id', auth, authorization('putCart'), updateCart);
cartRouter.put('/:id/products/:pid', auth, authorization('putProdCart'), updateProdInCart);
cartRouter.delete('/:id/products/:pid', auth, authorization('deleteProdCart'), deleteProdInCart);
cartRouter.delete('/:id', auth, authorization('deleteAllProdCart'),  deleteAllProdInCart);
export default cartRouter;
