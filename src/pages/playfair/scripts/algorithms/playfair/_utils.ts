export default function chunk(arr: any[], size: number): any[][] {
   return new Array(Math.ceil(arr.length / size)).fill(0).map((_, i) => {
      return arr.slice(i * size, (i + 1) * size);
   });
}