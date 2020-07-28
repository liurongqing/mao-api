'use strict';

var a = { c: 1 };
console.log('1....');
console.log('a?.b', a === null || a === void 0 ? void 0 : a.b);
console.log('a?.c', a === null || a === void 0 ? void 0 : a.c);
console.log('a?.d', a === null || a === void 0 ? void 0 : a.d);
