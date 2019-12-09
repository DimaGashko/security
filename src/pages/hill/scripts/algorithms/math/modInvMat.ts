import modInv from "./modInv";
import adjoint from "./adjoint";
import det from "./det";

export default function modInvMat(m: number[][], mod: number): number[][] {
   const d = Math.round(det(m));
   const invDet = modInv(modBy(d, mod), mod);

   return adjoint(m).map(r => r.map(a => {
      return Math.round(modBy(a * invDet, mod));
   }));
}

function modBy(v: number, m: number) {
   return (v < 0) ? m - (-v % m) : v % m;
}