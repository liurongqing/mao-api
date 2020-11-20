import { adminModel as Model } from '../../models/system/admin.model';
import { formatJson } from '../../utils';
// import { json, filterEmptyField } from '@/utils'
// import { pagination, errcode } from '@/const'

export default {
  // get 查询列表
  async find(ctx: any) {
    let condition: any = { isDeleted: 0 };
    // const {
    //   username,
    // } = ctx.query;

    // condition.username = username;

    const fields = '_id email status';


    const result = await Model.find(condition, fields)
      .sort({ createdAt: -1 });

    // const result = await Promise.all([
    //   // Model.countDocuments(condition),
    //   Model.find(condition, fields)
    //     .sort({ createdAt: -1 })
    // ]);
    // const [total, list] = result;
    ctx.body = formatJson(200, result);
  },
};
