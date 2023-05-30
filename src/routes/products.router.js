import { Router } from 'express';
import { create, createForGet, deleteProd, deleteForGet, getAll, getOne, update } from '../dao/controllers/products.controller.js';
import { authorization, passportCall } from '../utils.js';


const router = Router();

router.get('/', getAll);

router.get('/one/:pid', getOne);

router.get('/create',passportCall('jwt'), authorization(['admin', 'premium']), createForGet)

router.post("/create",passportCall('jwt'), authorization(['admin', 'premium']), create);

router.put('/modific/:pid',passportCall('jwt'), authorization(['admin', 'premium']), update);

router.get('/delete',passportCall('jwt'), authorization(['admin', 'premium']), deleteForGet);

router.post('/delete/:pid', passportCall('jwt'), authorization(['admin', 'premium']), deleteProd);

export default router;
