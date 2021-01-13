'use strict';

var mongoose = require('mongoose');
var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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

var WX_BASE_PATH = 'https://api.weixin.qq.com';
var APP_ID = 'wx6ef1e85ccdd6b748';
var APP_SECRET = '7303c7f9b4fe3cfc3768b2f5c7d4c435';
var LIFE = 3;
var SHARE_NUM = 5;
/**
 * 错误码
 */
var ERROR_CODE = {
    UNAUTHORIZED: -401,
    NOT_FOUND: -404,
    LOGIN_FAIL: -405,
    SHARE_FAIL: -406,
    RESET_LIFE_FAIL: -501 // 重置生命失败
};
// 慢慢只使用这个
var CODE = {
    SUCCESS: 0,
    UNAUTHORIZED: -401,
    NOT_FOUND: -404,
    LOGIN_FAIL: -405,
    SHARE_FAIL: -406,
    RESET_LIFE_FAIL: -501 // 重置生命失败
};
var SUCCESS_CODE = 0;
var JWT_SECRET = 'yjapsige__909320';

var jsonwebtoken = require('jsonwebtoken');
/**
 *
 * @param code 数字
 * @param data 返回数据
 * @param msg 返回信息
 */
var formatJson = function (code, data, msg) {
    if (code === void 0) { code = SUCCESS_CODE; }
    if (data === void 0) { data = {}; }
    if (msg === void 0) { msg = ''; }
    return {
        code: code,
        data: data,
        msg: msg,
    };
};
// export const encrypt = (word: string) => {
//   return CryptoJS.AES.encrypt(word, key).toString();
// };
// export const decrypt = (word: string) => {
//   const bytes = CryptoJS.AES.decrypt(word, key);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };
var getOpenid = function (str) {
    if (!str)
        return '';
    var data = jsonwebtoken.verify(str.replace('Bearer ', ''), JWT_SECRET);
    return data.data.split('-')[0];
};

var Schema = mongoose.Schema;
var usersModel = mongoose.model('users', new Schema({
    openid: String,
    level: Number,
    shareNum: {
        type: Number,
        default: SHARE_NUM,
    },
    life: {
        type: Number,
        default: LIFE
    },
    levels: Array,
    times: Array,
    avatarUrl: String,
    city: String,
    country: String,
    gender: String,
    language: String,
    nickName: {
        type: String,
        default: '游客'
    },
    province: String // 省
}, { collection: 'users', versionKey: false, timestamps: true }));

var Schema$1 = mongoose.Schema;
var adminModel = mongoose.model('admin', new Schema$1({
    username: {
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
}, { collection: 'admin', versionKey: false, timestamps: true }).index({ username: 1, isDeleted: -1 }, { unique: true }));

var jsonwebtoken$1 = require('jsonwebtoken');
var register = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.query, username = _a.username, password = _a.password;
                return [4 /*yield*/, adminModel.create({
                        username: username,
                        password: password
                    })];
            case 1:
                result = _b.sent();
                ctx.body = formatJson(0, result);
                return [2 /*return*/];
        }
    });
}); };
var login = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, adminModel.findOne({ username: username, password: password, status: 1 }, 'username')];
            case 1:
                result = _b.sent();
                if (result) {
                    ctx.body = formatJson(SUCCESS_CODE, jsonwebtoken$1.sign({
                        data: username,
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    }, JWT_SECRET));
                }
                else {
                    ctx.body = formatJson(ERROR_CODE.LOGIN_FAIL, null);
                }
                return [2 /*return*/];
        }
    });
}); };
// 查询所有信息
var find = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, authorization, openid, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fields = '_id levels level life';
                authorization = ctx.request.header.authorization;
                openid = getOpenid(authorization);
                if (!(authorization && openid)) return [3 /*break*/, 2];
                return [4 /*yield*/, usersModel.findOne({ openid: openid }, fields)];
            case 1:
                result = _a.sent();
                ctx.body = formatJson(SUCCESS_CODE, result);
                return [3 /*break*/, 3];
            case 2:
                ctx.body = formatJson(ERROR_CODE.UNAUTHORIZED, null);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
// 每日重置
var resetData = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var sign, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sign = ctx.request.body.sign;
                if (!(sign === 'UQyvy3*rAPYt_9vXd')) return [3 /*break*/, 3];
                return [4 /*yield*/, usersModel.updateMany({}, { $set: { shareNum: SHARE_NUM } })];
            case 1:
                _a.sent();
                return [4 /*yield*/, usersModel.updateMany({ life: { $lt: LIFE } }, { $set: { life: LIFE } })];
            case 2:
                result = _a.sent();
                ctx.body = formatJson(0, result);
                return [3 /*break*/, 4];
            case 3:
                ctx.body = formatJson(ERROR_CODE.RESET_LIFE_FAIL, {});
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };

var Schema$2 = mongoose.Schema;
var levelsModel = mongoose.model('levels', new Schema$2({
    level: Number,
    topic: Array,
    answer: Array,
    sumTime: {
        type: Number,
        default: 30 * 60
    },
    type: {
        type: Number,
        default: 4,
        enum: [4, 9]
    }
}, { collection: 'levels', versionKey: false, timestamps: true }));

// 获取列表
var find$1 = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fields = '_id level sumTime topic answer type createdAt updatedAt';
                return [4 /*yield*/, levelsModel.find({}, fields)];
            case 1:
                result = _a.sent();
                ctx.body = formatJson(0, result);
                return [2 /*return*/];
        }
    });
}); };
// 添加题目， 默认取总数加1
var save = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, type, sumTime, topic, answer, data, result, count, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.body, _id = _a._id, type = _a.type, sumTime = _a.sumTime, topic = _a.topic, answer = _a.answer;
                data = {
                    type: type,
                    topic: topic,
                    answer: answer,
                    sumTime: sumTime
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!_id) return [3 /*break*/, 3];
                return [4 /*yield*/, levelsModel.updateOne({ _id: _id }, { $set: data })];
            case 2:
                result = _b.sent();
                return [3 /*break*/, 7];
            case 3: return [4 /*yield*/, levelsModel.countDocuments({})];
            case 4:
                count = _b.sent();
                return [4 /*yield*/, levelsModel.create(__assign(__assign({}, data), { level: count + 1 }))];
            case 5:
                result = _b.sent();
                return [4 /*yield*/, usersModel.updateMany({}, {
                        $push: { levels: 4, times: -1 }
                    })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                ctx.body = formatJson(0, result);
                return [3 /*break*/, 9];
            case 8:
                err_1 = _b.sent();
                // console.log('err', err);
                ctx.body = formatJson(-100, err_1, '失败了');
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };

var Router = require('koa-router');
var adminRouter = new Router();
adminRouter
    .get('/user', find)
    .get('/level', find$1)
    .post('/level', save)
    .post('/reset-data', resetData)
    .post('/login', login)
    .get('/register', register); // 临时注册

var findOne = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var level, authorization, openid, life, fields, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                level = ctx.params.level;
                authorization = ctx.request.header.authorization;
                openid = getOpenid(authorization);
                return [4 /*yield*/, findLife(openid)];
            case 1:
                life = (_a.sent()).life;
                if (life <= 0) {
                    ctx.body = formatJson(0, { life: 0 }); // 无生命值
                    return [2 /*return*/];
                }
                fields = '_id type topic answer';
                return [4 /*yield*/, levelsModel.findOne({ level: level }, fields)];
            case 2:
                result = _a.sent();
                return [4 /*yield*/, decLife(openid, life)];
            case 3:
                _a.sent();
                ctx.body = formatJson(0, result);
                return [2 /*return*/];
        }
    });
}); };
// 查找生命值
var findLife = function (openid) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fields = '_id life';
                return [4 /*yield*/, usersModel.findOne({ openid: openid }, fields)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
// 减一个星
var decLife = function (openid, life) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersModel.updateOne({ openid: openid }, { $set: { life: life - 1 } })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

// 查询所有信息
var find$2 = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, authorization, openid, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fields = '_id levels level life';
                authorization = ctx.request.header.authorization;
                openid = getOpenid(authorization);
                return [4 /*yield*/, usersModel.findOne({ openid: openid }, fields)];
            case 1:
                result = _a.sent();
                ctx.body = formatJson(0, result);
                return [2 /*return*/];
        }
    });
}); };
// 保存更新用户数据
var save$1 = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, authorization, openid, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userInfo = ctx.request.body.userInfo;
                authorization = ctx.request.header.authorization;
                openid = getOpenid(authorization);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!openid) return [3 /*break*/, 3];
                return [4 /*yield*/, usersModel.updateOne({ openid: openid }, { $set: __assign({}, userInfo) })];
            case 2:
                result = _a.sent();
                return [3 /*break*/, 3];
            case 3:
                ctx.body = formatJson(0, result);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.log('err', err_1);
                ctx.body = formatJson(-100, err_1, '失败了');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// 成功更新用户关卡数据
var levelsSuccess = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, level, stars, authorization, openid, levels, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.body, level = _a.level, stars = _a.stars;
                authorization = ctx.request.header.authorization;
                openid = getOpenid(authorization);
                if (!openid) return [3 /*break*/, 3];
                return [4 /*yield*/, usersModel.findOne({ openid: openid }, 'levels')];
            case 1:
                levels = (_b.sent()).levels;
                levels = JSON.parse(levels);
                if (levels[level - 1] < stars) {
                    levels[level - 1] = stars;
                }
                if (levels[level] == 4) {
                    levels[level] = 0;
                }
                levels = JSON.stringify(levels);
                return [4 /*yield*/, usersModel.updateOne({ openid: openid }, {
                        $set: {
                            level: level,
                            levels: levels
                        }
                    })];
            case 2:
                result = _b.sent();
                ctx.body = formatJson(0, result);
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
// 分享
var share = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var authorization, openid, shareNum;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authorization = ctx.request.header.authorization;
                openid = getOpenid(authorization);
                if (!openid) return [3 /*break*/, 4];
                return [4 /*yield*/, usersModel.findOne({ openid: openid }, 'shareNum')];
            case 1:
                shareNum = (_a.sent()).shareNum;
                if (!(shareNum > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, usersModel.updateOne({ openid: openid }, {
                        $inc: {
                            shareNum: -1,
                            life: 1
                        }
                    })];
            case 2:
                _a.sent();
                ctx.body = formatJson(CODE.SUCCESS, {});
                return [3 /*break*/, 4];
            case 3:
                ctx.body = formatJson(CODE.SHARE_FAIL, {});
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };

var jsonwebtoken$2 = require('jsonwebtoken');
var login$1 = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var code, url, wxData, authStr, authorization;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = ctx.request.body.code;
                url = WX_BASE_PATH + "/sns/jscode2session?appid=" + APP_ID + "&secret=" + APP_SECRET + "&js_code=" + code + "&grant_type=authorization_code";
                return [4 /*yield*/, axios__default['default'](url)];
            case 1:
                wxData = (_a.sent()).data;
                if (wxData.openid) {
                    authStr = wxData.openid + '-' + wxData.session_key;
                    authorization = jsonwebtoken$2.sign({
                        data: authStr,
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    }, JWT_SECRET);
                    checkAndAddUserInfo(wxData.openid);
                    ctx.body = formatJson(wxData.errcode, authorization);
                }
                else {
                    ctx.body = formatJson(wxData.errcode, wxData);
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * 若该用户不存在，则添加
 */
var checkAndAddUserInfo = function (openid) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, levels, times, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersModel.findOne({ openid: openid })];
            case 1:
                doc = _a.sent();
                if (doc)
                    return [2 /*return*/];
                return [4 /*yield*/, generateLevels()];
            case 2:
                levels = _a.sent();
                return [4 /*yield*/, generateLevelTimes()];
            case 3:
                times = _a.sent();
                return [4 /*yield*/, usersModel.create({
                        openid: openid,
                        levels: levels,
                        times: times,
                        level: 1
                    })];
            case 4:
                result = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * 生成关卡信息
 */
var generateLevels = function () { return __awaiter(void 0, void 0, void 0, function () {
    var count, arr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, levelsModel.countDocuments({})];
            case 1:
                count = _a.sent();
                arr = Array.from({ length: count }, function () { return 4; });
                arr[0] = 0;
                return [2 /*return*/, arr];
        }
    });
}); };
/**
 * 生成关卡时间信息
 */
var generateLevelTimes = function () { return __awaiter(void 0, void 0, void 0, function () {
    var count, arr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, levelsModel.countDocuments({})];
            case 1:
                count = _a.sent();
                arr = Array.from({ length: count }, function () { return -1; });
                return [2 /*return*/, arr];
        }
    });
}); };

var Router$1 = require('koa-router');
var sudokuRouter = new Router$1();
sudokuRouter
    .get('/user', find$2)
    .post('/user', save$1)
    .post('/levels-success', levelsSuccess)
    // .get('/level', levelsController.find)
    .get('/level/:level', findOne)
    // .post('/level', levelsController.save)
    .post('/login', login$1)
    .post('/share', share);

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
var koaBody = require('koa-body');
var jwt = require('koa-jwt');
var app = new Koa();
// 数据库连接
db();
app.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var origin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                origin = ctx.request.header.origin;
                if (['http://127.0.0.1:4200', 'http://localhost:4200', 'https://manage.henmao.com'].includes(origin)) {
                    ctx.set('Access-Control-Allow-Origin', origin);
                    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
                    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
                }
                if (!(ctx.method == 'OPTIONS')) return [3 /*break*/, 1];
                ctx.body = 200;
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, next()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
// 无授权处理, 未登录，或过期
app.use(function (ctx, next) {
    return next().catch(function (err) {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = formatJson(ERROR_CODE.UNAUTHORIZED, null, '');
        }
        else {
            throw err;
        }
    });
});
app.use(jwt({ secret: JWT_SECRET, passthrough: false })
    .unless({
    path: [
        // /^\/sudoku/,
        /^\/admin\/login/,
        /^\/admin\/reset-data/,
        /^\/sudoku\/login/,
    ],
}));
app.use(koaBody());
app.use(routers.routes()).use(routers.allowedMethods());
app.on('error', function (err) {
    console.error(err.message);
});
// 不存在
app.use(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = formatJson(ERROR_CODE.NOT_FOUND, null);
        return [2 /*return*/];
    });
}); });
app.listen(9001);
