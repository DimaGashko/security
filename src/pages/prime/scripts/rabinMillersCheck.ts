import expMod from "./expMod";

/**
 * Miller-Rabin Primality Test
 * @returns true if n is **probably** prime and 
 *    false if n is definitely not prime
 */
export default function rabinMillersCheck(n: number): boolean {
   const a = 2;
   let k = 1;

   while ((n - 1) % 2 ** k === 0) {
      k++;
   }

   const m = (n - 1) / 2 ** --k;
   let b = expMod(a, m, n);

   if (b === 1 || b === n - 1) {
      return true;
   }
   
   while (true) {
      b = (b * b) % n;
      
      if (b === 1) return false;
      if (b === n - 1) return true;
   }
}  