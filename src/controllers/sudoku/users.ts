import { usersModel } from 'src/models/sudoku/users.model';
import { formatJson, decrypt, getOpenid } from 'src/utils';

export const find = async (ctx: any) => {
  const fields = '_id levels level life';
  const { authorization } = ctx.request.header;
  const openid = getOpenid(authorization);
  const result = await usersModel.findOne({ openid }, fields);
  ctx.body = formatJson(0, result);
};

export const save = async (ctx: any) => {
  // console.log('ctx.request.body', ctx.request.body);
  // console.log('ctx.request', ctx.request);
  const { userInfo } = ctx.request.body;
  const { authorization } = ctx.request.header;
  // console.log('authorization', authorization, ctx.request)
  const openid = getOpenid(authorization);
  let result: Object;
  try {
    if (openid) {
      result = await usersModel.updateOne({ openid }, { $set: { ...userInfo } });
    } else {
      // const count = await usersModel.count({});
      // result = await usersModel.create({
      //   ...data,
      //   level: count + 1
      // });
    }

    ctx.body = formatJson(0, result);
  } catch (err) {
    console.log('err', err);
    ctx.body = formatJson(-100, err, '失败了');
  }
};
