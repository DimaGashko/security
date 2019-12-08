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

   public encodePair(pair: string[]): string[] {
      return this.processPair(pair, 'encode');      
   }

   public decodePaid(pair: string[]): string[] {
      return this.processPair(pair, 'decode');
   }

   private processPair([a, b]: string[], mode: 'encode' | 'decode'): string[] {
      const shift = (mode === 'encode') ? 1 : -1;

      const { i: ai, j: aj } = this.gridMap.get(a);
      const { i: bi, j: bj } = this.gridMap.get(b);

      if (ai === bi) {
         return [
            this.get(ai, aj + shift),
            this.get(bi, bj + shift),
         ];
      }

      if (aj === bj) {
         return [
            this.get(ai + shift, aj),
            this.get(bi + shift, bj),
         ];
      }

      return [
         this.get(ai, bj),
         this.get(bi, aj),
      ];
   }

   private get(i: number, j: number): string {

   }

   private create() {
      this.grid = chunk(this.prepareAlphabet(this.code, this.alphabet), this.width);
      this.gridMap = this.createGridMap(this.grid);
   }

   private createGridMap(grid: string[][]): GridMap {
      return grid.reduce((map, row, i) => {
         row.forEach((ch, j) => map.set(ch, { i, j }));
         return map;
      }, new Map());
   }

   private prepareAlphabet(code: string, alphabet: string[]): string[] {
      const codeSet = new Set(code);
      return [...code.split(''), ...alphabet.filter(ch => !codeSet.has(ch))]
   }
}