import 'normalize.scss/normalize.scss';
import './index.scss';
import genPrime from './scripts/genPrime';
import expMod from './scripts/expMod';
import rabinMillersCheck from './scripts/rabinMillersCheck';
import smallPrimes from './scripts/smallPrimes';

printHello();
//gen();
mod();

window.mod = expMod;
window.rabinMillersCheck = rabinMillersCheck;
window.primes = smallPrimes;
window.gen

//smallPrimes.filter(p => p > 100).forEach(p => rabinMillersCheck(p));

function gen() {
   const n = genPrime();

   console.log(n);
   
}

function mod() {

}

function printHello() {
   console.log('%cSoftware Security', 'color: red; font-size: 28px');
   console.log('%cPrime numbers generations & Exponential modulo', 'color: red; font-size: 20px');
}