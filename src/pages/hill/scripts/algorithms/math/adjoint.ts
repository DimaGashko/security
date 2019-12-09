import confractor from "./confractor";
import transpose from "./transpose";

export default function adjoint(m: number[][]): number[][] {
   return transpose(
      m.map((r, i) => r.map((_, j) => (-1) ** (i + j) * confractor(m, i, j)))
   );
}