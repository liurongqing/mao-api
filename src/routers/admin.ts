const Router = require('koa-router');
export const adminRouter = new Router();
import { adminController } from 'src/controllers/admin';

adminRouter
  .get('/user', adminController.find)
  .post('/login', adminController.login);


