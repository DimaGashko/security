import PlayfairGrid from "./PlayfairGrid";
import chunk from "lodash/chunk";

export function encode(msg: string, grid: PlayfairGrid): string {
   return prepareMsg(msg).map(p => grid.encodePair(p)).flatMap(s => s).join('');
}

export function decode(msg: string, grid: PlayfairGrid): string {
   return prepareMsg(msg).map(p => grid.decodePair(p)).flatMap(s => s).join('');
}

function prepareMsg(msg) {
   return chunk(msg.toLowerCase().replace(/\s/g, '').split(''), 2);
}