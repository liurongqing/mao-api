import { levelsModel } from '../../models/sudoku/levels.model';
import { usersModel } from '../../models/sudoku/users.model';
import { formatJson } from '../../utils';

export const find = async (ctx: any) => {
  const { life }: any = await findLife(ctx);
  if (life <= 0) {
    ctx.body = formatJson(-1, {}); // 无生命值
    return;
  }

  const fields = '_id topic answer type';
  const result = await levelsModel.findOne({ level: '1' }, fields);
  ctx.body = formatJson(0, result);
};

export const findLife = async (ctx: any) => {
  const fields = '_id life';
  const result = await usersModel.findOne({ openid: 'xx' }, fields);
  return result;
};
