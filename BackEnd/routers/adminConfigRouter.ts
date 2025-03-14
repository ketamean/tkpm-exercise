import { Router } from 'express';
import adminConfigController from '../controllers/adminConfigController'
const router = Router();

router.get('/', adminConfigController.get);
router.put('/', adminConfigController.put);
router.delete('/', adminConfigController.delete);
export default router;