import { Router } from 'express';
import studentController from '../controllers/studentsController'
const router = Router();

router.get('/', studentController.get);
router.post('/', studentController.post);
router.put('/', studentController.put);
router.delete('/', studentController.delete);

export default router;