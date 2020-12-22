const Router = require('koa-router');
export const adminRouter = new Router();

import AdminController from 'src/controllers/system/admin';

adminRouter
  .get('/system/admin', AdminController.find);


