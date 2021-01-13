const jsonwebtoken = require('jsonwebtoken');
import axios from 'axios';
import { formatJson } from 'src/utils';
import { APP_ID, APP_SECRET, WX_BASE_PATH, JWT_SECRET} from 'src/const';
import { usersModel } from '../../models/sudoku/users.model';
import { levelsModel } from '../../models/sudoku/levels.model';


export const login = async (ctx: any) => {
  const {
    code
  } = ctx.request.body;

//   jwt.verify(token, secret, function (err, decoded) {
//     if (!err){
//           console.log(decoded.name);  //会输出123，如果过了60秒，则有错误。
//      }
// })
  const url = `${WX_BASE_PATH}/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`;
  const { data: wxData } = await axios(url);
  if (wxData.openid) {
    const authStr = wxData.openid + '-' + wxData.session_key;
    // const authorization = encrypt(authStr);
    const authorization = jsonwebtoken.sign({
      data: authStr,
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
    }, JWT_SECRET);
    checkAndAddUserInfo(wxData.openid);
    ctx.body = formatJson(wxData.errcode, authorization);
  } else {
    ctx.body = formatJson(wxData.errcode, wxData);
  }
};

/**
 * 若该用户不存在，则添加
 */
const checkAndAddUserInfo = async (openid: string) => {
  const doc = await usersModel.findOne({ openid });
  if (doc) return;
  const levels = await generateLevels();
  const times = await generateLevelTimes();
  // console.log('levels', levels)
  const result = await usersModel.create({
    openid,
    levels,
    times,
    level: 1
  });
  // console.log('add result', result);
};

/**
 * 生成关卡信息
 */
const generateLevels = async () => {
  const count = await levelsModel.countDocuments({});
  const arr = Array.from({ length: count }, () => 4);
  arr[0] = 0;
  return arr;
};

/**
 * 生成关卡时间信息
 */
const generateLevelTimes = async () => {
  const count = await levelsModel.countDocuments({});
  const arr = Array.from({ length: count }, () => -1);
  return arr;
};
