import { usersModel as Model } from '../../models/sudoku/users.model';
import { formatJson } from '../../utils';

export const find = async (ctx: any) => {
  const fields = '_id levels level life';
  const result = await Model.findOne({ openid: 'xx' }, fields);
  ctx.body = formatJson(0, result);
};
