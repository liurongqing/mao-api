const Router = require('koa-router');
export const sudokuRouter = new Router();

import { usersController, levelsController, loginController } from 'src/controllers/sudoku';

sudokuRouter
  .get('/user', usersController.find)
  .get('/level', levelsController.find)
  .post('/login', loginController.login);


