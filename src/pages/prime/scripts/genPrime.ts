import { smallPrimes } from "./smallPrimes";

export default function genPrime(size = 16) {
   let strN = new Array(size - 2).fill('')
      .map(_ => (Math.random() > 0.5) ? '1' : '0').join('');

   let n = parseInt(`1${strN}1`, 2);

   while (!test1(n) && !test2(n)) {
      console.log(n, 'Nope!');
      n += 2;
   }

   return n;
}

function test1(n: number): boolean { 
   return smallPrimes.some(p => n % p === 0);
}

function test2(n: number): boolean {
   return [1, 2, 3].some(() => rabinMillerCheck(n));
}

function rabinMillerCheck(n): boolean {
   return test1(n);
}