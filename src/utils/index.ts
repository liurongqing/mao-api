import * as CryptoJS from "crypto-js";
/**
 *
 * @param code 数字
 * @param data 返回数据
 * @param msg 返回信息
 */
export const formatJson = (code = 0, data = {}, msg = '') => {
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
