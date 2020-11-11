const Router = require('koa-router');
export const routers = new Router();

import { adminRouter } from './admin';

routers.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());


