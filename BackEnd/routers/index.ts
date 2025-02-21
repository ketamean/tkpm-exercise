import {Router} from 'express'
import studentsRouter from './studentsRouter'
import facultiesRouter from './facultiesRouter'
import programsRouter from './programsRouter'
import statusRouter from './statusRouter'

const router = Router();
router.use('/students', studentsRouter);
router.use('/faculties', facultiesRouter);
router.use('/programs', programsRouter);
router.use('/status', statusRouter);

export default router;