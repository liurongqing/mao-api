const Koa = require("koa");
const koaBody = require('koa-body');

import { formatJson } from 'src/utils';
import { routers } from 'src/routers';
import { db } from 'src/config/database';


const app = new Koa();
// 数据库连接
db();


app.use(koaBody());
app.use(routers.routes()).use(routers.allowedMethods());

app.on('error', (err: any) => {
  console.error(err.message);
});

app.use(async (ctx: any) => {
  ctx.body = formatJson(-2, '404');
});

app.listen(9001);
