import 'normalize.scss/normalize.scss';
import './index.scss';
import genPrime from './scripts/genPrime';
import { expMod } from './scripts/expMod';

printHello();
//gen();
mod();

window.mod = expMod;

function gen() {
   const n = genPrime();

   console.log(n);
   
}

function mod() {

}

function printHello() {
   
}