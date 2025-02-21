import {Router} from 'express'
import studentsRouter from './studentsRouter'
import facultiesRouter from './facultiesRouter'

const router = Router();
router.use('/students', studentsRouter);
router.use('/faculties', facultiesRouter);

export default router;