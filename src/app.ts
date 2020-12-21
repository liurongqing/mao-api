const Koa = require("koa");
const koaBody = require('koa-body');

import { formatJson } from 'src/utils';
import { routers } from 'src/routers';
import { db } from 'src/config/database';


const app = new Koa();
// 数据库连接
db();

// 跨域， 需要做开发环境的区分
app.use(async (ctx: any, next: any) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(koaBody());
app.use(routers.routes()).use(routers.allowedMethods());

app.on('error', (err: any) => {
  console.error(err.message);
});

app.use(async (ctx: any) => {
  ctx.body = formatJson(-2, '404');
});

app.listen(9001);
