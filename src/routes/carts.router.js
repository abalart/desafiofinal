import { Router } from 'express';
import { addProduct, clearCart, create, deleteCart, deleteOneProduct, getAll, getOne, update, updateProduct, purchase } from '../dao/controllers/cart.controller.js';
import { authorization } from '../utils.js';

const router = Router();

router.get('/', authorization('admin'), getAll);

router.get('/:cid', authorization('user'), getOne);

router.post('/', authorization('user'), create);

router.post('/:cid/products/:pid', authorization('user'), addProduct);

router.put('/:cid', authorization('user'), update);

router.put('/:cid/products/:pid', authorization('user'), updateProduct);

router.delete('/:cid', authorization('admin'), deleteCart)

router.delete('/:cid', authorization('user'), clearCart);

router.delete('/:cid/products/:pid', authorization('user'), deleteOneProduct)

router.post('/:cid/purchase',authorization('user'), purchase);

export default router;