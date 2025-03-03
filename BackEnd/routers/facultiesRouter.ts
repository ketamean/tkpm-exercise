import { Router } from 'express';
import facultiesController from '../controllers/facultiesController'
const router = Router();

router.get('/', facultiesController.get);
router.post('/', facultiesController.post);
router.put('/', facultiesController.put);
router.delete('/', facultiesController.delete);
export default router;