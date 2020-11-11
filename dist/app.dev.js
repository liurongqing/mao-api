'use strict';

// sum.ts
function sum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (prev, total) { return total + prev; }, 0);
}
function b() { }

var aa = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sum: sum,
  b: b
});

var Koa = require('koa');
console.log(aa);
var app = new Koa();
