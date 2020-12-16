import axios from 'axios';
import { formatJson, encrypt, decrypt } from 'src/utils';
import { APP_ID, APP_SECRET, WX_BASE_PATH } from 'src/const';


export const login = async (ctx: any) => {
  const {
    code
  } = ctx.request.body;

  const url = `${WX_BASE_PATH}/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`;
  const { data: wxData } = await axios(url);
  if (wxData.openid) {
    const authStr = wxData.openid + '-' + wxData.session_key;;
    const authorization = encrypt(authStr);
    ctx.body = formatJson(wxData.errcode, authorization);
  } else {
    ctx.body = formatJson(wxData.errcode, wxData);
  }
};

