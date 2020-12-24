const jsonwebtoken = require('jsonwebtoken');

import { usersModel } from 'src/models/sudoku/users.model';
import { adminModel } from 'src/models/admin/admin.model';
import { formatJson, decrypt, getOpenid } from 'src/utils';
import { ERROR_CODE, SUCCESS_CODE, JWT_SECRET } from 'src/const';

export const register = async (ctx: any) => {
  const { username, password } = ctx.request.query;
  const result = await adminModel.create({
    username,
    password
  });
  ctx.body = formatJson(0, result);
};

export const login = async (ctx: any) => {
  const { username, password } = ctx.request.body;
  const result = await adminModel.findOne({ username, password, status: 1 }, 'username');
  if(result){
    ctx.body = formatJson(SUCCESS_CODE, jsonwebtoken.sign({
      data: username,
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
    }, JWT_SECRET));
  }else{
    ctx.body = formatJson(ERROR_CODE.LOGIN_FAIL, null);
  }
};


// 查询所有信息
export const find = async (ctx: any) => {
  const fields = '_id levels level life';
  const { authorization } = ctx.request.header;
  const openid = getOpenid(authorization);
  // console.log('openid')
  if (authorization && openid) {
    const result = await usersModel.findOne({ openid }, fields);
    ctx.body = formatJson(SUCCESS_CODE, result);
  } else {
    ctx.body = formatJson(ERROR_CODE.UNAUTHORIZED, null);
  }

};
