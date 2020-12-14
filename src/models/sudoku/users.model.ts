import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const usersModel = mongoose.model(
  'users',
  new Schema(
    {
      openid: String,
      level: Number,
      life: {
        type: Number,
        default: 3
      },
      levels: Array
    },
    { collection: 'users', versionKey: false, timestamps: true }
  )
);
