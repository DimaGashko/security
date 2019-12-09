import det from "./det";

export default function confractor(m: number[][], i: number, j: number): number {
   const filtered = m.filter((_, k) => k !== i)
      .map(r => r.filter((_, k) => k !== j));
   
   return ((-1) ** (i + j)) * det(filtered);
}