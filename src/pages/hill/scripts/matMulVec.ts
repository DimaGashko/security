
export default function matMulVec(a: number[][], b: number[]): number[] {
   const m1 = a.length;
   const m2 = b.length;

   if (m1 && a[0].length !== m2) {
      throw 'The matrix and the vector are inconsistent';
   }

   const res: number[] = new Array(m1);

   for (let j = 0; j < m1; j++) {
      let item = 0;

      for (let k = 0; k < m2; k++) {
         item += a[j][k] * b[k];
      }

      res[j] = item;
   }

   return res;
}