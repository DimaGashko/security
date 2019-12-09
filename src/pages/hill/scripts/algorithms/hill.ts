import chunk from 'lodash/chunk';
import matMulVec from './math/matMulVec';
import invertMat from './math/modInvMat';

export function encode(msg: string, _key: string): string {
   const key = prepareKey(_key);
   
   return process(padMsg(msg, key[0].length), key);
}

export function decode(msg: string, key: string): string {
   return process(msg, invertMat(prepareKey(key)));
}

function process(msg: string, key: number[][]): string {
   return chunk(prepareStr(msg), key[0].length)
      .map(m => matMulVec(key, m).map(c => c % 2 ** 16))
      .flatMap(r => r)
      .map(code => Math.round(code))
      .map(code => String.fromCharCode(code))
      .join('');
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