import { usersModel } from 'src/models/sudoku/users.model';
import { formatJson, getOpenid } from 'src/utils';

// 查询所有信息
export const find = async (ctx: any) => {
  const fields = '_id levels level life';
  const { authorization } = ctx.request.header;
  const openid = getOpenid(authorization);
  const result = await usersModel.findOne({ openid }, fields);
  ctx.body = formatJson(0, result);
};

// 保存更新用户数据
export const save = async (ctx: any) => {
  const { userInfo } = ctx.request.body;
  const { authorization } = ctx.request.header;
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

// 成功更新用户关卡数据
export const levelsSuccess = async (ctx: any) => {
  const { level, stars } = ctx.request.body;
  const { authorization } = ctx.request.header;
  const openid = getOpenid(authorization);
  if (openid) {
    let { levels }: any = await usersModel.findOne({ openid }, 'levels');
    levels = JSON.parse(levels)
    if(levels[level - 1] < stars){
      levels[level - 1] = stars;
    }
    if(levels[level] == 4){
      levels[level] = 0;
    }
    levels = JSON.stringify(levels)
    const result = await usersModel.updateOne({ openid }, {
      $set: {
        level,
        levels
      }
    });
    ctx.body = formatJson(0, result);
  }
};
