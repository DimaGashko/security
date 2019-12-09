import modInv from "./modInv";
import det from "./det";
import adjoint from "./adjoint";

export default function modInvMat(m: number[][], mod: number): number[][] {
   const invDet = modInv(Math.abs(det(m) ^ 0), mod);
   console.log(invDet);

   return adjoint(m).map(r => r.map(a => (a + mod) % mod))
      .map(r => r.map(a => a * invDet))
      .map(r => r.map(a => a % mod));
}
