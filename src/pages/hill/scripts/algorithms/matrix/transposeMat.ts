export default function transposeMat(matrix: number[][]): number[][] {
   return matrix.map((r, i) => r.map((v, j) => matrix[j][i]));
}