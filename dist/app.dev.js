'use strict';

var login = function (ctx, next) {
    ctx.body = 'login';
};

var Router = require('koa-router');
var adminRouter = new Router();
adminRouter
    .get('/login', login);

var Router$1 = require('koa-router');
var routers = new Router$1();
routers.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());

var Koa = require("koa");
var app = new Koa();
app.use(routers.routes()).use(routers.allowedMethods());
app.on('error', function (err) {
    console.error(err.message);
});
app.listen(9001);
