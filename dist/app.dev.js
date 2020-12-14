'use strict';

var mongoose = require('mongoose');

var login = function (ctx, next) {
    ctx.body = 'login';
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var Schema = mongoose.Schema;
var adminModel = mongoose.model('mao_admin', new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    // nickname: String, // 昵称
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1,
        enum: [0, 1]
    }
    // role: {
    //   type: Array
    // }, // 所属角色
    // isDeleted: {
    //   type: Number,
    //   default: 0,
    //   trim: true,
    //   enum: [0, 1]
    // }
}, { collection: 'mao_admin', versionKey: false, timestamps: true }).index({ username: 1, isDeleted: -1 }, { unique: true }));

var formatJson = function (code, data, msg) {
    if (code === void 0) { code = 0; }
    if (data === void 0) { data = {}; }
    if (msg === void 0) { msg = ''; }
    return {
        code: code,
        data: data,
        msg: msg,
    };
};

// import { json, filterEmptyField } from '@/utils'
// import { pagination, errcode } from '@/const'
var AdminController = {
    // get 查询列表
    find: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, fields, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condition = { isDeleted: 0 };
                        fields = '_id email status';
                        return [4 /*yield*/, adminModel.find(condition, fields)
                                .sort({ createdAt: -1 })];
                    case 1:
                        result = _a.sent();
                        // const result = await Promise.all([
                        //   // Model.countDocuments(condition),
                        //   Model.find(condition, fields)
                        //     .sort({ createdAt: -1 })
                        // ]);
                        // const [total, list] = result;
                        ctx.body = formatJson(200, result);
                        return [2 /*return*/];
                }
            });
        });
    },
};

var Router = require('koa-router');
var adminRouter = new Router();
adminRouter
    .get('/login', login)
    .get('/system/admin', AdminController.find);

var Schema$1 = mongoose.Schema;
var usersModel = mongoose.model('users', new Schema$1({
    openid: String,
    level: Number,
    life: {
        type: Number,
        default: 3
    },
    levels: Array
}, { collection: 'users', versionKey: false, timestamps: true }));

var SudokuUsersController = {
    // get 查询列表
    find: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var fields, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fields = '_id levels level life';
                        return [4 /*yield*/, usersModel.findOne({ openid: 'xx' }, fields)];
                    case 1:
                        result = _a.sent();
                        ctx.body = formatJson(0, result);
                        return [2 /*return*/];
                }
            });
        });
    },
};

var Router$1 = require('koa-router');
var sudokuRouter = new Router$1();
sudokuRouter
    .get('/users', SudokuUsersController.find);

var Router$2 = require('koa-router');
var routers = new Router$2();
routers.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());
routers.use('/sudoku', sudokuRouter.routes(), sudokuRouter.allowedMethods());

var config = {
    user: 'liurongqing',
    pwd: '123456',
    database: 'sudoku',
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
