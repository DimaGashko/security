const ALPHABET = 'abcdefghiklmnopqrstuvwxyz'.split('');
const DELIMITER = 'x';
const GRID_WIDTH = 5;

export default function encode(code: string, msg: string, alphabet = ALPHABET, delimiter = DELIMITER, gridWidth = GRID_WIDTH): string {
   const grid = createGrid(code, alphabet, gridWidth);

   return prepareMsg(msg, delimiter)
      .map(pair => encodePair(pair, grid))
      .map(([a, b]) => a + b)
      .join('');
}

function encodePair([a, b]: string[], grid): number[] {

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