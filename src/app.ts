const Koa = require("koa");
const app = new Koa();

import { routers } from 'src/routers';
app.use(routers.routes()).use(routers.allowedMethods());

app.on('error', (err: any) => {
  console.error(err.message);
});

app.listen(9001);
