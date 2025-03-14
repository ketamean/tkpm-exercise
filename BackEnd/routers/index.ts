import {Router} from 'express'
import studentsRouter from './studentsRouter'
import facultiesRouter from './facultiesRouter'
import programsRouter from './programsRouter'
import statusRouter from './statusRouter'
import adminConfigRouter from './adminConfigRouter'
import servicesRouter from './servicesRouter'

const router = Router();
router.use('/students', studentsRouter);
router.use('/faculties', facultiesRouter);
router.use('/programs', programsRouter);
router.use('/status', statusRouter);
router.use('/adminConfig', adminConfigRouter);
router.use('/services', servicesRouter);

export default router;