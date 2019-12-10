import { smallPrimes } from "./smallPrimes";

export default function genPrime(size = 16) {
   let strN = new Array(size - 2).fill('')
      .map(_ => (Math.random() > 0.5) ? '1' : '0').join('');

   let n = parseInt(`1${strN}1`, 2);

   if (smallPrimes.some(p => n % p === 0)) {
      console.log('Nope!');
      return genPrime(size);
   }

   return n;
}

