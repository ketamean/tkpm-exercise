import { Router } from 'express';
import servicesStudent from './servicesStudentRouter'
const router = Router();

router.use('/students', servicesStudent);

export default router;