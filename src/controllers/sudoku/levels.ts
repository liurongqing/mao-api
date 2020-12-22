import { levelsModel } from '../../models/sudoku/levels.model';
import { usersModel } from '../../models/sudoku/users.model';
import { formatJson, getOpenid } from 'src/utils';


// 获取列表
export const find = async (ctx: any) => {
  const fields = '_id level topic answer type createdAt updatedAt';
  const result = await levelsModel.find({}, fields);
  ctx.body = formatJson(0, result);
};

export const findOne = async (ctx: any) => {
  const { level } = ctx.params;
  const { authorization } = ctx.request.header;
  const openid = getOpenid(authorization);
  const { life }: any = await findLife(openid);
  if (life <= 0) {
    ctx.body = formatJson(-1, {}); // 无生命值
    return;
  }

  const fields = '_id type topic answer';
  const result = await levelsModel.findOne({ level }, fields);
  ctx.body = formatJson(0, result);
};

// 添加题目， 默认取总数加1
export const save = async (ctx: any) => {
  const { _id, type, topic, answer } = ctx.request.body;
  let data: any = {
    type,
    topic,
    answer
  };
  let result: Object;
  try {
    if (_id) {
      result = await levelsModel.updateOne({ _id }, { $set: data });
    } else {
      const count = await levelsModel.count({});
      result = await levelsModel.create({
        ...data,
        level: count + 1
      });
    }

    ctx.body = formatJson(0, result);
  } catch (err) {
    console.log('err', err);
    ctx.body = formatJson(-100, err, '失败了');
  }
};

// 查找生命值
export const findLife = async (openid: string) => {
  const fields = '_id life';
  const result = await usersModel.findOne({ openid }, fields);
  return result;
};
