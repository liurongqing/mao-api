const Koa = require("koa");
const koaBody = require('koa-body');
var jwt = require('koa-jwt');


import { formatJson } from 'src/utils';
import { ERROR_CODE, JWT_SECRET } from 'src/const';
import { routers } from 'src/routers';
import { db } from 'src/config/database';


const app = new Koa();
// 数据库连接
db();

// 跨域设置
app.use(async (ctx: any, next: any) => {
  const { origin } = ctx.request.header;
  if (['http://localhost:4200', 'http://127.0.0.1:4200', 'https://manage.henmao.com'].includes(origin)) {
    ctx.set('Access-Control-Allow-Origin', origin);
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  }
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

// 无授权处理, 未登录，或过期
app.use(function (ctx: any, next: any) {
  return next().catch((err: any) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = formatJson(ERROR_CODE.UNAUTHORIZED, null, '');
    } else {
      throw err;
    }
  });
});

app.use(jwt({ secret: JWT_SECRET, passthrough: false })
  .unless({
    path:
      [
        // /^\/sudoku/,
        /^\/admin\/login/,
        /^\/sudoku\/login/,
      ],
  }));

app.use(koaBody());
app.use(routers.routes()).use(routers.allowedMethods());

app.on('error', (err: any) => {
  console.error(err.message);
});

// 不存在
app.use(async (ctx: any) => {
  ctx.body = formatJson(ERROR_CODE.NOT_FOUND, null);
});

app.listen(9001);
