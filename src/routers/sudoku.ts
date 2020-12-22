const Router = require('koa-router');
export const sudokuRouter = new Router();

import { usersController, levelsController, loginController } from 'src/controllers/sudoku';

sudokuRouter
  .get('/user', usersController.find)
  .post('/user', usersController.save)
  .get('/level', levelsController.find)
  .get('/level/:level', levelsController.findOne)
  .post('/level', levelsController.save)
  .post('/login', loginController.login);


