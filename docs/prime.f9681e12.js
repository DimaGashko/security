parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Y4ak":[function(require,module,exports) {

},{}],"l1NV":[function(require,module,exports) {

},{}],"FqrC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499,1511,1523,1531,1543,1549,1553,1559,1567,1571,1579,1583,1597,1601,1607,1609,1613,1619,1621,1627,1637,1657,1663,1667,1669,1693,1697,1699,1709,1721,1723,1733,1741,1747,1753,1759,1777,1783,1787,1789,1801,1811,1823,1831,1847,1861,1867,1871,1873,1877,1879,1889,1901,1907,1913,1931,1933,1949,1951,1973,1979,1987,1993,1997,1999];
},{}],"sFSU":[function(require,module,exports) {
"use strict";function t(t,e,r){if(1===e)return t%r;var n=e.toString(2).split("").map(function(t){return+t}),o=new Array(n.length);return o[0]=t,n.forEach(function(e,n){if(0!==n){var u=Math.pow(o[n-1],2)%r;o[n]=1===e?u*t%r:u}}),o[o.length-1]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"INt4":[function(require,module,exports) {
"use strict";var r=this&&this.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(exports,"__esModule",{value:!0});var e=r(require("./expMod"));function t(r){if((r=Math.abs(r))<2)return!1;if(2==r)return!0;for(var t=1;(r-1)%Math.pow(2,t)==0;)t++;var u=(r-1)/Math.pow(2,--t),a=e.default(2,u,r);if(1===a||a===r-1)return!0;for(var f=0;f<t;f++){if(1===(a=a*a%r))return!1;if(a===r-1)return!0}return!1}exports.default=t;
},{"./expMod":"sFSU"}],"Cue2":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("./smallPrimes")),t=e(require("./rabinMillersCheck"));function n(e){void 0===e&&(e=16);for(var r=new Array(e-2).fill("").map(function(e){return Math.random()>.5?"1":"0"}).join(""),t=parseInt("1"+r+"1",2);!u(t);)t+=2;return t}function u(e){return r.default.some(function(r){return e%r==0})&&t.default(e)}exports.default=n;
},{"./smallPrimes":"FqrC","./rabinMillersCheck":"INt4"}],"xlIz":[function(require,module,exports) {

"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),require("normalize.scss/normalize.scss"),require("./index.scss");var r=e(require("./scripts/genPrime")),i=e(require("./scripts/expMod")),n=e(require("./scripts/rabinMillersCheck")),o=window;function s(){console.log("%cSoftware Security","color: red; font-size: 28px"),console.log("%cPrime numbers generation & Exponential modulo","color: red; font-size: 20px"),console.log("%cAvailable commands:\n      > genPrime(size) - generate random size-bits prime number\n      > checkPrime(n) - check if n is prime (Miller-Rabin primality test)\n      > expMod(base, exp, n) - find the exponential modulo (base^exp mod n)\n   ".replace(/\n\s+/g,"\n"),"font-size: 16px")}s(),o.genPrime=r.default,o.checkPrime=n.default,o.expMod=i.default;
},{"normalize.scss/normalize.scss":"l1NV","./index.scss":"l1NV","./scripts/genPrime":"Cue2","./scripts/expMod":"sFSU","./scripts/rabinMillersCheck":"INt4"}]},{},["xlIz"], null)
//# sourceMappingURL=../prime.f9681e12.js.map