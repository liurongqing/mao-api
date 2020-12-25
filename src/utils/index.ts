const jsonwebtoken = require('jsonwebtoken');

import * as CryptoJS from "crypto-js";
import { SUCCESS_CODE, JWT_SECRET } from "src/const";

/**
 *
 * @param code 数字
 * @param data 返回数据
 * @param msg 返回信息
 */
export const formatJson = (code = SUCCESS_CODE, data = {}, msg = '') => {
  return {
    code,
    data,
    msg,
  };
};

const key = '1234567654321MAO';

export const encrypt = (word: string) => {
  return CryptoJS.AES.encrypt(word, key).toString();
};

export const decrypt = (word: string) => {
  const bytes = CryptoJS.AES.decrypt(word, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getOpenid = (str: string) => {
  if (!str) return '';
  const data = jsonwebtoken.verify(str.replace('Bearer ', ''), JWT_SECRET);
  return data.data.split('-')[0];
};
