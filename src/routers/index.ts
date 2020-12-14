const Router = require('koa-router');
export const routers = new Router();

import { adminRouter } from './admin';
import { sudokuRouter } from './sudoku';

routers.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());
routers.use('/sudoku', sudokuRouter.routes(), sudokuRouter.allowedMethods());


