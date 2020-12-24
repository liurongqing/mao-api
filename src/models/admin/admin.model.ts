import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const adminModel = mongoose.model(
  'admin',
  new Schema(
    {
      username: {
        type: String,
        required: true,
        trim: true
      }, // 用户名
      // nickname: String, // 昵称
      password: {
        type: String,
        required: true
      }, // 密码
      status: {
        type: Number,
        default: 1, // 1开启 0关闭
        enum: [0, 1]
      }
      // role: {
      //   type: Array
      // }, // 所属角色
      // isDeleted: {
      //   type: Number,
      //   default: 0,
      //   trim: true,
      //   enum: [0, 1]
      // }
    },
    { collection: 'admin', versionKey: false, timestamps: true }
  ).index({ username: 1, isDeleted: -1 }, { unique: true })
);
