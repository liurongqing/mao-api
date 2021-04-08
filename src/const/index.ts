export const WX_BASE_PATH = 'https://api.weixin.qq.com';
export const APP_ID = 'wx6ef1e85ccdd6b748';
export const APP_SECRET = '7303c7f9b4fe3cfc3768b2f5c7d4c435';

export const LIFE = 3;
export const SHARE_NUM = 3;

/**
 * 错误码
 */

export const ERROR_CODE = {
  UNAUTHORIZED: -401, // 未授权
  NOT_FOUND: -404, // 接口不存在
  LOGIN_FAIL: -405, // 登录失败
  SHARE_FAIL: -406, // 今日分享次数用完了
  RESET_LIFE_FAIL: -501 // 重置生命失败
};

// 慢慢只使用这个
export const CODE = {
  SUCCESS: 0,
  UNAUTHORIZED: -401, // 未授权
  NOT_FOUND: -404, // 接口不存在
  LOGIN_FAIL: -405, // 登录失败
  SHARE_FAIL: -406, // 今日分享次数用完了
  RESET_LIFE_FAIL: -501 // 重置生命失败
};

export const SUCCESS_CODE = 0;
export const JWT_SECRET = 'yjapsige__909320';
export const JWT_EXP = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365); // 365天有效期
