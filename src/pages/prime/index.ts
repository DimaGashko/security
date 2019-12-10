import 'normalize.scss/normalize.scss';
import './index.scss';

import gen from './scripts/genPrime';
import mod from './scripts/expMod';
import rabinMillersCheck from './scripts/rabinMillersCheck';

const global = <any>window;

printHello();

global.genPrime = gen;
global.checkPrime = rabinMillersCheck;
global.expMod = mod;

function printHello() {
   console.log('%cSoftware Security', 'color: red; font-size: 28px');
   console.log('%cPrime numbers generation & Exponential modulo', 'color: red; font-size: 20px');

   console.log(`%cAvailable commands:
      > genPrime(size) - generate random size-bits prime number
      > checkPrime(n) - check if n is prime (Miller-Rabin primality test)
      > expMod(base, exp, n) - find the exponential modulo (base^exp mod n)
   `.replace(/\n\s+/g, '\n'), 'font-size: 16px');
}