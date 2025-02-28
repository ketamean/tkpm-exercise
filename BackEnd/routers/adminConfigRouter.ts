import { Router } from 'express';
import adminConfigController from '../controllers/adminConfigController'
const router = Router();

router.get('/', adminConfigController.get);
router.put('/', adminConfigController.put);
export default router;