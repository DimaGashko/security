import chunk from 'lodash/chunk';
import matMulVec from '../matMulVec';
import invertMat from '../invertMat';

const ALPHABET_LEN = 2 ** 16;

/**
 * Encode the message using Hill Cipher
 * @param msg your message
 * @param key square char matrix
 */
export function encode(msg: string, _key: string): string {
   const size = Math.sqrt(_key.length) ^ 0;
   const key = chunk(_key.split('').map(ch => ch.charCodeAt(0)), size);
   msg = msg.padEnd(msg.length + size - msg.length % size, ' ');
   
   return chunk(msg.split('').map(ch => ch.codePointAt(0)), size)
      .map(m => processMsg(m, key))
      .flatMap(r => r)
      .map(code => String.fromCharCode(code % ALPHABET_LEN))
      .join('');
}

export function decode(msg: string, _key: string): string {
   const size = Math.sqrt(_key.length) ^ 0;
   const key = chunk(_key.split('').map(ch => ch.charCodeAt(0)), size);

   return chunk(msg.split('').map(ch => ch.codePointAt(0)), size)
      .map(m => processMsg(m, invertMat(key)))
      .flatMap(r => r)
      .map(code => Math.round(code))
      .map(code => String.fromCharCode(code % ALPHABET_LEN))
      .join('');
}

function processMsg(msg: number[], key: number[][]): number[] {
   return matMulVec(key, msg);
}

function prepareKey() {
   
}