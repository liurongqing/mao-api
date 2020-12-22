import * as mongoose from 'mongoose';
import { LIFE } from "../../const/index";
const { Schema } = mongoose;

export const usersModel = mongoose.model(
  'users',
  new Schema(
    {
      openid: String,
      level: Number,
      life: {
        type: Number,
        default: LIFE
      },
      levels: String,
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
