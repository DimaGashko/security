const ALPHABET = 'abcdefghiklmnopqrstuvwxyz'.split('');
const DELIMITER = 'x';
const GRID_WIDTH = 5;

export function encode(code: string, msg: string, alphabet = ALPHABET, delimiter = DELIMITER, gridWidth = GRID_WIDTH) {
   const grid = createGrid(code, alphabet, gridWidth);
   const preparedMsg = prepareMsg(msg, delimiter);
   return { grid, preparedMsg };
}

export function decode(code: string, msg: string) {

} 

function prepareMsg(msg: string, delimiter: string): string[][] {
   return chunk(msg.toLowerCase().replace(/\s/g, '').split(''), 2).map(([a, b]) => {
      return [a, (a === b || !b) ? delimiter : b];
   });
}

function createGrid(code: string, alphabet: string[], width: number) {
   return chunk(prepareAlphabet(code, alphabet), width);
}

function prepareAlphabet(code: string, alphabet: string[]): string[] {
   const codeSet = new Set(code);
   return [...code.split(''), ...alphabet.filter(ch => !codeSet.has(ch))]
}

function chunk(arr: any[], size: number): any[][] {
   return new Array(Math.ceil(arr.length / size)).fill(0).map((_, i) => {
      return arr.slice(i * size, (i + 1) * size);
   });
}