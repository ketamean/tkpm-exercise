import { Router } from 'express';
import serviceStudentController from '../controllers/serviceStudentController';
const router = Router();

router.get('/verification-paperwork', serviceStudentController.getVerificationPaperwork);

export default router;