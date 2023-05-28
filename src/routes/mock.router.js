import { Router } from 'express';
import { getAll } from '../dao/controllers/mock.controller.js';


const router = Router();

router.get('/', getAll);

export default router;