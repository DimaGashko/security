import PlayfairGrid from "./PlayfairGrid";
import chunk from "lodash/chunk";

export function encode(msg: string, grid: PlayfairGrid): string {
   return prepareMsg(msg, grid.alphabet)
      .map(pair => grid.encodePair(pair)).flatMap(s => s).join('');
}

export function decode(msg: string, grid: PlayfairGrid): string {
   return prepareMsg(msg, grid.alphabet)
      .map(pair => grid.decodePair(pair)).flatMap(s => s).join('');
}

function prepareMsg(msg: string, alphabet: string[]): string[][] {
   msg = msg.toLowerCase().replace(/\s/g, '')
      .replace(new RegExp(`[^${alphabet.join('')}]`, 'g'), alphabet[0]);

   return chunk(msg.split(''), 2);
}