import chunk from 'lodash/chunk';

type GridMap = Map<string, { i: number, j: number }>

export default class PlayfairGrid {
   private _grid: string[][];
   private _gridMap: GridMap = new Map();

   constructor(
      private _code: string,
      private _alphabet: string[],
      private _delimiter: string,
      private _width: number,
   ) {
      this.create();
   }

   public static createEnGrid(code: string) {
      const alphabet = "abcdefghijklmnopqrstuvwxyz'._".split('');
      return new PlayfairGrid(code, alphabet, "'", 5);
   }

   public static createUaGrid(code: string) {
      const alphabet = "абвгдеєжзиіїйклмнопрстуфхцчшщьюя'._".split('');
      return new PlayfairGrid(code, alphabet, "'", 5);
   }

   public encodePair(pair: string[]): string[] {
      return this.processPair(pair, 'encode');      
   }

   public decodePair(pair: string[]): string[] {
      return this.processPair(pair, 'decode');
   }

   public get alphabet() {
      return this._alphabet.slice();
   }

   private create() {
      this._grid = chunk(this.prepareAlphabet(this._code, this._alphabet), this._width);
      this._gridMap = this.createGridMap(this._grid);
   }

   private processPair([a, b]: string[], mode: 'encode' | 'decode'): string[] {
      const shift = (mode === 'encode') ? 1 : -1;
      
      if (b === a || !b) b = this._delimiter;
      const { i: ai, j: aj } = this._gridMap.get(a);
      const { i: bi, j: bj } = this._gridMap.get(b);

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
      if (i < 0) i = this._grid.length - 1;
      else if (i === this._grid.length) i = 0;

      if (j < 0) j = this._width - 1;
      else if (j === this._width) j = 0;

      return this._grid[i][j];
   }

   private createGridMap(grid: string[][]): GridMap {
      return grid.reduce((map, row, i) => {
         row.forEach((ch, j) => map.set(ch, { i, j }));
         return map;
      }, new Map());
   }

   private prepareAlphabet(code: string, alphabet: string[]): string[] {
      code = code.toLowerCase();

      const codeSet = new Set(code);
      return [...code.split(''), ...alphabet.filter(ch => !codeSet.has(ch))]
   }
}