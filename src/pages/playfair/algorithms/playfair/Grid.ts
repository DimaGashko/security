import chunk from "./_utils";

type GridMap = Map<string, { i: number, j: number }>

export default class Grid {
   private grid: string[][];
   private gridMap: GridMap = new Map();

   constructor(
      private code: string,
      private alphabet: string[],
      private delimiter: string,
      private width = 5
   ) { 
      this.create();
   }

   public static createEnGrid(code: string) {
      return new Grid(code, 'abcdefghiklmnopqrstuvwxyz'.split(''), 'x', 5);
   }

   public static createUaGrid(code: string) {
      return new Grid(code, "абвгдеєжзиіїйклмнопрстуфхцчшщьюя'._".split(''), "'", 5);
   }

   public encodePair([a, b]: string[]): string[] {
      const aPos = this.gridMap.get(a);
      const bPos = this.gridMap.get(b);

      if (aPos.i === bPos.i) {
         return [
            this.get(aPos.i, aPos.j + 1),
            this.get(bPos.i, bPos.j + 1),
         ];
      }

      if (aPos.j === bPos.j) {
         return [
            this.get(aPos.i + 1, aPos.j),
            this.get(bPos.i + 1, bPos.j),
         ];
      }

      return [ 
         this.get(aPos.i, bPos.j),
         this.get(bPos.i, aPos.j),
      ];
   }

   public decodePaid([a, b]: string[]): string[] {

   }

   private get(i: number, j: number): string {

   }

   private create() {
      this.grid = chunk(this.prepareAlphabet(this.code, this.alphabet), this.width);
      this.gridMap = this.createGridMap(this.grid);
   }

   private createGridMap(grid: string[][]): GridMap {
      return grid.reduce((map, row, i) => { 
         row.forEach((ch, j) => map.set(ch, {i, j}));
         return map;
      }, new Map());
   }

   private prepareAlphabet(code: string, alphabet: string[]): string[] {
      const codeSet = new Set(code);
      return [...code.split(''), ...alphabet.filter(ch => !codeSet.has(ch))]
   }
}