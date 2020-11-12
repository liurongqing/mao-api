'use strict';

var mongoose = require('mongoose');

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

var config = {
    user: 'liurongqing',
    pwd: '123456',
    database: 'mao',
    host: 'localhost',
    port: 27017
};

var user = config.user, pwd = config.pwd, database = config.database, host = config.host, port = config.port;
var db = (function () {
    mongoose.connect("mongodb://" + user + ":" + pwd + "@" + host + ":" + port + "/" + database, {
        useCreateIndex: true,
        autoIndex: false,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    var db = mongoose.connection;
    db.on('error', function (err) {
        console.error('连接数据库失败， %o', err);
    });
    db.on('open', function () {
        console.log('连接数据库成功');
    });
});

var Koa = require("koa");
var app = new Koa();
// 数据库连接
db();
app.use(routers.routes()).use(routers.allowedMethods());
app.on('error', function (err) {
    console.error(err.message);
});
app.listen(9001);
