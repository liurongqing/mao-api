import { usersModel } from 'src/models/sudoku/users.model';
import { formatJson, decrypt, getOpenid } from 'src/utils';
import { ERROR_CODE, SUCCESS_CODE } from 'src/const';


export const login = async (ctx: any) => {
  console.log(ctx.request.body);
  ctx.body = formatJson(0, 1)
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
