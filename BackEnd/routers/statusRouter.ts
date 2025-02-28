import { Router } from 'express';
import statusController from '../controllers/statusController'
const router = Router();

router.get('/', statusController.get);
router.post('/', statusController.post);
router.put('/', statusController.put);
router.delete('/', statusController.delete);
export default router;