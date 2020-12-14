const Router = require('koa-router');
export const sudokuRouter = new Router();

import SudokuUsersController from 'src/controllers/sudoku/users';

sudokuRouter
  .get('/users', SudokuUsersController.find);


