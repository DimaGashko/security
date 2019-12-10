import 'normalize.scss/normalize.scss';
import './index.scss';
import genPrime from './scripts/genPrime';
import expMod from './scripts/expMod';
import rabinMillersCheck from './scripts/rabinMillersCheck';
import smallPrimes from './scripts/smallPrimes';

const global = <any>window;

printHello();

global.getPrime = (...args) => { 
   const prime = genPrime(...args);
   console.log(`%c${prime}`, 'color: green');
}



function printHello() {
   console.log('%cSoftware Security', 'color: red; font-size: 28px');
   console.log('%cPrime numbers \bgenerations & Exponential modulo', 'color: red; font-size: 20px');

   console.log(`%cAvailable commands:
      > genPrime(size) - generate random size-bits prime number
      > expMod(base, exp, n) - find the exponential modulo (base^exp mod n)
   `.replace(/\n\s+/g, '\n'), 'font-size: 16px');
}