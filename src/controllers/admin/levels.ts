import { levelsModel } from '../../models/sudoku/levels.model';
import { usersModel } from '../../models/sudoku/users.model';
import { formatJson } from 'src/utils';

// 获取列表
export const find = async (ctx: any) => {
  const fields = '_id level sumTime topic answer type createdAt updatedAt';
  const result = await levelsModel.find({}, fields);
  ctx.body = formatJson(0, result);
};

// 添加题目， 默认取总数加1
export const save = async (ctx: any) => {
  const { _id, type, sumTime, topic, answer } = ctx.request.body;
  let data: any = {
    type,
    topic,
    answer,
    sumTime
  };
  let result: Object;
  try {
    if (_id) {
      result = await levelsModel.updateOne({ _id }, { $set: data });
    } else {
      // 添加关卡，需要更新用户信息的 levels 与 times
      // 若失败则回滚，这里以后要处理一下
      // 以后更改为，更新的条数差，而不是更新一条，  在页面上也可设置手动更新操作
      const count = await levelsModel.countDocuments({});
      result = await levelsModel.create({
        ...data,
        level: count + 1
      });

      await usersModel.updateMany({}, {
        $push: { levels: 4, times: -1 }
      });
    }

    ctx.body = formatJson(0, result);
  } catch (err) {
    // console.log('err', err);
    ctx.body = formatJson(-100, err, '失败了');
  }
};
