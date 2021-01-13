const Router = require('koa-router');
export const adminRouter = new Router();
import { adminController, levelsController } from 'src/controllers/admin';

adminRouter
  .get('/user', adminController.find)
  .get('/level', levelsController.find)
  .post('/level', levelsController.save)
  .post('/reset-data', adminController.resetData)
  .post('/login', adminController.login)
  .get('/register', adminController.register); // 临时注册


