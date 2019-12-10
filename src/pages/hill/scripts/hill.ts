import chunk from 'lodash/chunk';
import { modInvMat, matMulVec } from './math';

export function encode(msg: string, _key: string): string {
   const key = prepareKey(_key);
   return process(padMsg(msg, key[0].length), key);
}

export function decode(msg: string, key: string): string {
   return process(msg, modInvMat(prepareKey(key), 2 ** 16));
}

function process(msg: string, key: number[][]): string {
   const codes = chunk(prepareStr(msg), key[0].length)
      .map(m => matMulVec(key, m)).flatMap(r => r);

   return String.fromCharCode(...codes);
}

function prepareKey(key: string) {
   const size = Math.sqrt(key.length) ^ 0;
   return chunk(key.slice(0, size * size).split('')
      .map(ch => ch.codePointAt(0)), size);
}

function prepareStr(str: string): number[] {
   return str.split('').map(ch => ch.codePointAt(0));
}

function padMsg(msg: string, size: number): string {
   return msg.padEnd(msg.length + size - msg.length % size, ' ');
}
