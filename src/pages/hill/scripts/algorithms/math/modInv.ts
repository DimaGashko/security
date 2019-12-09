
export default function modInv(a: number, m: number) {
   a = a % m;

   for (let x = 1; x < m; x++) {
      if ((a * x) % m == 1) return x;
   }

   return NaN;
} 