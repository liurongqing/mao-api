const Router = require('koa-router');
export const adminRouter = new Router();

import { login } from 'src/controllers/login';

adminRouter
  .get('/login', login);


