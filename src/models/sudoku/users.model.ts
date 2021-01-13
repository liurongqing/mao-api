import * as mongoose from 'mongoose';
import { LIFE, SHARE_NUM } from "../../const/index";
const { Schema } = mongoose;

export const usersModel = mongoose.model(
  'users',
  new Schema(
    {
      openid: String,
      level: Number,
      shareNum: {
        type: Number,
        default: SHARE_NUM,
      }, // 当日分享次数
      life: {
        type: Number,
        default: LIFE
      },
      levels: Array, // 星星状态
      times: Array, // 每个关卡时间状态[-1, -1, -1]
      avatarUrl: String, // 头像
      city: String, // "Shenzhen"
      country: String, // "China"
      gender: String, // 性别 1男
      language: String, // 语言
      nickName: {
        type: String,
        default: '游客'
      }, // 昵称
      province: String // 省
    },
    { collection: 'users', versionKey: false, timestamps: true }
  )
);
