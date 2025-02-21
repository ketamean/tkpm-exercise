import { Router } from 'express';
import programsController from '../controllers/programsController'
const router = Router();

router.get('/', programsController.get);
router.post('/', programsController.post);
router.put('/', programsController.put);

export default router;