import {Router} from 'express'
import studentsRouter from './studentsRouter'

const router = Router();
router.use('/', studentsRouter);

export default router;