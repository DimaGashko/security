
import { det as _det } from 'mathjs';

export function modInvMat(m: number[][], mod: number): number[][] {
   const d = Math.round(det(m));
   const invDet = modInv(modBy(d, mod), mod);

   return adjoint(m).map(r => r.map(a => {
      return Math.round(modBy(a * invDet, mod));
   }));
}

export function det(m: number[][]): number {
   if (m.length === 2) {
      return m[0][0] * m[1][1] - m[0][1] * m[1][0];
   }

   return m.map((n, i) => n[0] * ((-1) ** i) * minor(m, i, 0))
      .reduce((sum, n) => sum + n, 0);
}

export function matMulVec(m: number[][], v: number[]): number[] {
   if (m.length && m[0].length !== v.length) {
      throw 'The matrix and the vector are inconsistent';
   }

   return m.map((r) => {
      return v.reduce((sum, b, j) => sum + r[j] * b, 0);
   });
}

export function adjoint(m: number[][]): number[][] {
   return transpose(m.map((r, i) => r.map((_, j) => confractor(m, i, j))));
}

export function confractor(m: number[][], i: number, j: number): number {
   return ((-1) ** (i + j)) * minor(m, i, j);
}

export function minor(m: number[][], i: number, j: number): number {
   const filtered = m.filter((_, k) => k !== i)
      .map(r => r.filter((_, k) => k !== j));
   
   return det(filtered);
}

export function transpose(matrix: number[][]): number[][] {
   return matrix.map((r, i) => r.map((v, j) => matrix[j][i]));
}

export function modInv(a: number, m: number) {
   a = a % m;

   for (let x = 1; x < m; x++) {
      if ((a * x) % m == 1) return x;
   }

   throw "There is no modular multiplicative inverse for the integer";
}

export function modBy(v: number, m: number) {
   return (v < 0) ? m - (-v % m) : v % m;
}