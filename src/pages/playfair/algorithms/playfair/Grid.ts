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

   create() {
      this.grid = chunk(this.prepareAlphabet(this.code, this.alphabet), this.width);
      this.gridMap = this.createGridMap(this.grid);
   }

   createGridMap(grid: string[][]): GridMap {
      return grid.reduce((map, row, i) => { 
         row.forEach((ch, j) => map.set(ch, {i, j}));
         return map;
      }, new Map());
   }

   prepareAlphabet(code: string, alphabet: string[]): string[] {
      const codeSet = new Set(code);
      return [...code.split(''), ...alphabet.filter(ch => !codeSet.has(ch))]
   }
}