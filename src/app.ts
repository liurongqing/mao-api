const Koa = require("koa");
const app = new Koa();

import { routers } from 'src/routers';
import { db } from 'src/config/database';

// 数据库连接
db()


app.use(routers.routes()).use(routers.allowedMethods());

app.on('error', (err: any) => {
  console.error(err.message);
});

app.listen(9001);
