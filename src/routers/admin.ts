const Router = require('koa-router');
export const adminRouter = new Router();

import { login } from 'src/controllers/login';
import AdminController from 'src/controllers/system/admin';

adminRouter
  .get('/login', login)
  .get('/system/admin', AdminController.find);


