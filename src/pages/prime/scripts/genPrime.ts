import smallPrimes from "./smallPrimes";
import rabinMillersCheck from "./rabinMillersCheck";

export default function genPrime(size = 16) {
   let strN = new Array(size - 2).fill('')
      .map(_ => (Math.random() > 0.5) ? '1' : '0').join('');

   let n = parseInt(`1${strN}1`, 2);

   while (check(n)) {
      console.log(n, 'Nope!');
      n += 2;
   }

   return n;
}

function check(n: number): boolean {
   return smallPrimes.some(p => n % p === 0) &&
      rabinMillersCheck(n);
}