import 'normalize.scss/normalize.scss';
import './index.scss';
import genPrime from './scripts/genPrime';

printHello();
gen();

function gen() {
   const n = genPrime();

   console.log(n);
   
}

function printHello() {
   
}