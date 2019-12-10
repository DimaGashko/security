import 'normalize.scss/normalize.scss';
import './index.scss';
import genPrime from './scripts/genPrime';
import expMod from './scripts/expMod';
import rabinMillersCheck from './scripts/rabinMillersCheck';

printHello();
//gen();
mod();

window.mod = expMod;
window.rabinMillersCheck = rabinMillersCheck;

function gen() {
   const n = genPrime();

   console.log(n);
   
}

function mod() {

}

function printHello() {
   
}