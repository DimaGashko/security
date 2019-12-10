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
   return [1, 2, 3].some(() => rabinMillersCheck(n));
}

function rabinMillersCheck(n): boolean {
   let k = 0, m = n - 1, prevK, prevM;

   while (m === (m ^ 0)) {
      prevK = k;
      prevM = m;
      
      k++;
      m = m / (2 ** k);
   }

   k = prevK;
   m = prevM;

   let a = 2;

   console.log(n, k, m);

   return test1(n);
}  