import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const levelsModel = mongoose.model(
  'levels',
  new Schema(
    {
      level: Number, // 第几关
      topic: Array, // 题目
      answer: Array, // 答案
      type: {
        type: Number,
        default: 4, // 4宫格，与9宫格
        enum: [4, 9]
      }
    },
    { collection: 'levels', versionKey: false, timestamps: true }
  )
);
