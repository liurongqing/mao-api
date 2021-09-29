"use strict";var mongoose$1=require("mongoose"),axios=require("axios");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function _interopNamespace(e){if(e&&e.__esModule)return e;var n=Object.create(null);return e&&Object.keys(e).forEach(function(k){var d;"default"!==k&&(d=Object.getOwnPropertyDescriptor(e,k),Object.defineProperty(n,k,d.get?d:{enumerable:!0,get:function(){return e[k]}}))}),n.default=e,Object.freeze(n)}var mongoose__namespace=_interopNamespace(mongoose$1),axios__default=_interopDefaultLegacy(axios),__assign=function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};function __awaiter(thisArg,_arguments,P,generator){return new(P=P||Promise)(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):((value=result.value)instanceof P?value:new P(function(resolve){resolve(value)})).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())})}function __generator(thisArg,body){var f,y,t,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]},g={next:verb(0),throw:verb(1),return:verb(2)};return"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,(op=t?[2&op[0],t.value]:op)[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=0<(t=_.trys).length&&t[t.length-1])&&(6===op[0]||2===op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}}var WX_BASE_PATH="https://api.weixin.qq.com",APP_ID="wx6ef1e85ccdd6b748",APP_SECRET="7303c7f9b4fe3cfc3768b2f5c7d4c435",LIFE=3,SHARE_NUM=3,ERROR_CODE={UNAUTHORIZED:-401,NOT_FOUND:-404,LOGIN_FAIL:-405,SHARE_FAIL:-406,RESET_LIFE_FAIL:-501},CODE={SUCCESS:0,UNAUTHORIZED:-401,NOT_FOUND:-404,LOGIN_FAIL:-405,SHARE_FAIL:-406,RESET_LIFE_FAIL:-501},SUCCESS_CODE=0,JWT_SECRET="yjapsige__909320",JWT_EXP=Math.floor(Date.now()/1e3)+31536e3,jsonwebtoken$2=require("jsonwebtoken"),formatJson=function(code,data,msg){return{code:code=void 0===code?SUCCESS_CODE:code,data:data=void 0===data?{}:data,msg:msg=void 0===msg?"":msg}},getOpenid=function(d){if(!d)return"";var data=jsonwebtoken$2.verify(d.replace("Bearer ",""),JWT_SECRET),d=data.data.split("#-#");return(d||data.data.split("-"))[0]},Schema$2=mongoose__namespace.Schema,usersModel=mongoose__namespace.model("users",new Schema$2({openid:String,level:Number,shareNum:{type:Number,default:SHARE_NUM},life:{type:Number,default:LIFE},levels:Array,times:Array,avatarUrl:String,city:String,country:String,gender:String,language:String,nickName:{type:String,default:"游客"},province:String},{collection:"users",versionKey:!1,timestamps:!0})),Schema$1=mongoose__namespace.Schema,adminModel=mongoose__namespace.model("admin",new Schema$1({username:{type:String,required:!0,trim:!0},password:{type:String,required:!0},status:{type:Number,default:1,enum:[0,1]}},{collection:"admin",versionKey:!1,timestamps:!0}).index({username:1,isDeleted:-1},{unique:!0})),jsonwebtoken$1=require("jsonwebtoken"),register=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var username,result;return __generator(this,function(_b){switch(_b.label){case 0:return result=ctx.request.query,username=result.username,result=result.password,[4,adminModel.create({username:username,password:result})];case 1:return result=_b.sent(),ctx.body=formatJson(0,result),[2]}})})},login$1=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var username,result;return __generator(this,function(_b){switch(_b.label){case 0:return result=ctx.request.body,username=result.username,result=result.password,[4,adminModel.findOne({username:username,password:result,status:1},"username")];case 1:return result=_b.sent(),ctx.body=result?formatJson(SUCCESS_CODE,jsonwebtoken$1.sign({data:username,exp:JWT_EXP},JWT_SECRET)):formatJson(ERROR_CODE.LOGIN_FAIL,null),[2]}})})},find$2=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var authorization,result;return __generator(this,function(_a){switch(_a.label){case 0:return authorization=ctx.request.header.authorization,result=getOpenid(authorization),authorization&&result?[4,usersModel.findOne({openid:result},"_id levels level life")]:[3,2];case 1:return result=_a.sent(),ctx.body=formatJson(SUCCESS_CODE,result),[3,3];case 2:ctx.body=formatJson(ERROR_CODE.UNAUTHORIZED,null),_a.label=3;case 3:return[2]}})})},resetData=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var result;return __generator(this,function(_a){switch(_a.label){case 0:return"UQyvy3*rAPYt_9vXd"!==ctx.request.body.sign?[3,3]:[4,usersModel.updateMany({},{$set:{shareNum:SHARE_NUM}})];case 1:return _a.sent(),[4,usersModel.updateMany({life:{$lt:LIFE}},{$set:{life:LIFE}})];case 2:return result=_a.sent(),ctx.body=formatJson(0,result),[3,4];case 3:ctx.body=formatJson(ERROR_CODE.RESET_LIFE_FAIL,{}),_a.label=4;case 4:return[2]}})})},Schema=mongoose__namespace.Schema,levelsModel=mongoose__namespace.model("levels",new Schema({level:Number,topic:Array,answer:Array,sumTime:{type:Number,default:1800},type:{type:Number,default:4,enum:[4,9]}},{collection:"levels",versionKey:!1,timestamps:!0})),find$1=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var result;return __generator(this,function(_a){switch(_a.label){case 0:return[4,levelsModel.find({},"_id level sumTime topic answer type createdAt updatedAt")];case 1:return result=_a.sent(),ctx.body=formatJson(0,result),[2]}})})},save$1=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var _id,type,topic,answer,data,result,err_1;return __generator(this,function(_b){switch(_b.label){case 0:answer=ctx.request.body,_id=answer._id,type=answer.type,data=answer.sumTime,topic=answer.topic,answer=answer.answer,data={type:type,topic:topic,answer:answer,sumTime:data},_b.label=1;case 1:return _b.trys.push([1,8,,9]),_id?[4,levelsModel.updateOne({_id:_id},{$set:data})]:[3,3];case 2:return result=_b.sent(),[3,7];case 3:return[4,levelsModel.countDocuments({})];case 4:return err_1=_b.sent(),[4,levelsModel.create(__assign(__assign({},data),{level:err_1+1}))];case 5:return result=_b.sent(),[4,usersModel.updateMany({},{$push:{levels:4,times:-1}})];case 6:_b.sent(),_b.label=7;case 7:return ctx.body=formatJson(0,result),[3,9];case 8:return err_1=_b.sent(),ctx.body=formatJson(-100,err_1,"失败了"),[3,9];case 9:return[2]}})})},Router$2=require("koa-router"),adminRouter=new Router$2;adminRouter.get("/user",find$2).get("/level",find$1).post("/level",save$1).post("/reset-data",resetData).post("/login",login$1).get("/register",register);var findOne=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var level,openid,life,result;return __generator(this,function(_a){switch(_a.label){case 0:return level=ctx.params.level,openid=ctx.request.header.authorization,openid=getOpenid(openid),[4,findLife(openid)];case 1:return(life=_a.sent().life)<=0?(ctx.body=formatJson(0,{life:0}),[2]):[4,levelsModel.findOne({level:level},"_id type sumTime topic answer")];case 2:return result=_a.sent(),[4,decLife(openid,life)];case 3:return _a.sent(),ctx.body=formatJson(0,result),[2]}})})},findLife=function(openid){return __awaiter(void 0,void 0,void 0,function(){return __generator(this,function(_a){switch(_a.label){case 0:return[4,usersModel.findOne({openid:openid},"_id life")];case 1:return[2,_a.sent()]}})})},decLife=function(openid,life){return __awaiter(void 0,void 0,void 0,function(){return __generator(this,function(_a){switch(_a.label){case 0:return[4,usersModel.updateOne({openid:openid},{$set:{life:life-1}})];case 1:return _a.sent(),[2]}})})},find=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var result;return __generator(this,function(_a){switch(_a.label){case 0:return result=ctx.request.header.authorization,result=getOpenid(result),[4,usersModel.findOne({openid:result},"_id levels level life")];case 1:return result=_a.sent(),ctx.body=formatJson(0,result),[2]}})})},save=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var userInfo,openid,result,err_1;return __generator(this,function(_a){switch(_a.label){case 0:userInfo=ctx.request.body.userInfo,err_1=ctx.request.header.authorization,openid=getOpenid(err_1),_a.label=1;case 1:return _a.trys.push([1,4,,5]),openid?[4,usersModel.updateOne({openid:openid},{$set:__assign({},userInfo)})]:[3,3];case 2:return result=_a.sent(),[3,3];case 3:return ctx.body=formatJson(0,result),[3,5];case 4:return err_1=_a.sent(),console.log("err",err_1),ctx.body=formatJson(-100,err_1,"失败了"),[3,5];case 5:return[2]}})})},levelsSuccess=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var level,stars,openid,result;return __generator(this,function(_b){switch(_b.label){case 0:return openid=ctx.request.body,level=openid.level,stars=openid.stars,openid=ctx.request.header.authorization,(openid=getOpenid(openid))?[4,usersModel.findOne({openid:openid},"levels")]:[3,3];case 1:return(result=_b.sent().levels)[level-1]<stars&&(result[level-1]=stars),4==result[level]&&(result[level]=0),[4,usersModel.updateOne({openid:openid},{$set:{level:level,levels:result}})];case 2:result=_b.sent(),ctx.body=formatJson(0,result),_b.label=3;case 3:return[2]}})})},share=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var openid;return __generator(this,function(_a){switch(_a.label){case 0:return openid=ctx.request.header.authorization,(openid=getOpenid(openid))?[4,usersModel.findOne({openid:openid},"shareNum")]:[3,4];case 1:return 0<_a.sent().shareNum?[4,usersModel.updateOne({openid:openid},{$inc:{shareNum:-1,life:1}})]:[3,3];case 2:return _a.sent(),ctx.body=formatJson(CODE.SUCCESS,{}),[3,4];case 3:ctx.body=formatJson(CODE.SHARE_FAIL,{}),_a.label=4;case 4:return[2]}})})},jsonwebtoken=require("jsonwebtoken"),login=function(ctx){return __awaiter(void 0,void 0,void 0,function(){var url,wxData,authorization,infoData;return __generator(this,function(_a){switch(_a.label){case 0:return url=ctx.request.body.code,url=WX_BASE_PATH+"/sns/jscode2session?appid="+APP_ID+"&secret="+APP_SECRET+"&js_code="+url+"&grant_type=authorization_code",[4,axios__default.default(url)];case 1:return(wxData=_a.sent().data,console.log("wxData",wxData),wxData.openid)?(infoData=wxData.openid+"#-#"+wxData.session_key,authorization=jsonwebtoken.sign({data:infoData,exp:JWT_EXP},JWT_SECRET),[4,checkAndAddUserInfo(wxData.openid)]):[3,3];case 2:return infoData=_a.sent(),console.log("infoData",infoData),ctx.body=formatJson(wxData.errcode,authorization),[3,4];case 3:ctx.body=formatJson(wxData.errcode,wxData),_a.label=4;case 4:return[2]}})})},checkAndAddUserInfo=function(openid){return __awaiter(void 0,void 0,void 0,function(){var levels,times;return __generator(this,function(_a){switch(_a.label){case 0:return[4,usersModel.findOne({openid:openid})];case 1:return _a.sent()?[2]:[4,generateLevels()];case 2:return levels=_a.sent(),[4,generateLevelTimes()];case 3:return times=_a.sent(),[4,usersModel.create({openid:openid,levels:levels,times:times,level:1})];case 4:return[2,_a.sent()]}})})},generateLevels=function(){return __awaiter(void 0,void 0,void 0,function(){var arr;return __generator(this,function(_a){switch(_a.label){case 0:return[4,levelsModel.countDocuments({})];case 1:return arr=_a.sent(),(arr=Array.from({length:arr},function(){return 4}))[0]=0,[2,arr]}})})},generateLevelTimes=function(){return __awaiter(void 0,void 0,void 0,function(){var count;return __generator(this,function(_a){switch(_a.label){case 0:return[4,levelsModel.countDocuments({})];case 1:return count=_a.sent(),[2,Array.from({length:count},function(){return-1})]}})})},Router$1=require("koa-router"),sudokuRouter=new Router$1;sudokuRouter.get("/user",find).post("/user",save).post("/levels-success",levelsSuccess).get("/level/:level",findOne).post("/login",login).post("/share",share);var Router=require("koa-router"),routers=new Router;routers.use("/admin",adminRouter.routes(),adminRouter.allowedMethods()),routers.use("/sudoku",sudokuRouter.routes(),sudokuRouter.allowedMethods());var config={user:"liurongqing",pwd:"123456",database:"sudoku",host:"localhost",port:27017},mongoose=require("mongoose"),user=config.user,pwd=config.pwd,database=config.database,host=config.host,port=config.port;console.log("mongoose",mongoose.connect);var db=function(){mongoose.connect("mongodb://"+user+":"+pwd+"@"+host+":"+port+"/"+database,{useCreateIndex:!0,autoIndex:!1,useFindAndModify:!1,useUnifiedTopology:!0,useNewUrlParser:!0});var db=mongoose.connection;db.on("error",function(err){console.error("连接数据库失败， %o",err)}),db.on("open",function(){console.log("连接数据库成功")})},Koa=require("koa"),koaBody=require("koa-body"),jwt=require("koa-jwt"),app=new Koa;db(),app.use(function(ctx,next){return __awaiter(void 0,void 0,void 0,function(){var origin;return __generator(this,function(_a){switch(_a.label){case 0:return(origin=ctx.request.header.origin,["http://127.0.0.1:4200","http://localhost:4200","https://manage.henmao.com"].includes(origin)&&(ctx.set("Access-Control-Allow-Origin",origin),ctx.set("Access-Control-Allow-Headers","Content-Type, Content-Length, Authorization, authorization, Accept, X-Requested-With"),ctx.set("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS")),"OPTIONS"!=ctx.method)?[3,1]:(ctx.body=200,[3,3]);case 1:return[4,next()];case 2:_a.sent(),_a.label=3;case 3:return[2]}})})}),app.use(function(ctx,next){return next().catch(function(err){if(401!=err.status)throw err;ctx.status=401,ctx.body=formatJson(ERROR_CODE.UNAUTHORIZED,null,"")})}),app.use(jwt({secret:JWT_SECRET,passthrough:!1}).unless({path:[/^\/admin\/login/,/^\/admin\/reset-data/,/^\/sudoku\/login/]})),app.use(koaBody()),app.use(routers.routes()).use(routers.allowedMethods()),app.on("error",function(err){console.error(err.message)}),app.use(function(ctx){return __awaiter(void 0,void 0,void 0,function(){return __generator(this,function(_a){return ctx.body=formatJson(ERROR_CODE.NOT_FOUND,null),[2]})})}),app.listen(9001);
