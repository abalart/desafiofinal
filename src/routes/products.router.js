import { Router } from 'express';
import { create, deleteProd, getAll, getOne, update } from '../dao/controllers/products.controller.js';
import { authorization } from '../utils.js';


const router = Router();

router.get('/', getAll);

router.get('/:pid', getOne);

router.post("/", authorization(['admin', 'premium']), create);

router.put('/:pid', authorization(['admin', 'premium']), update);

router.delete('/:pid', authorization(['admin', 'premium']), deleteProd);

export default router;
