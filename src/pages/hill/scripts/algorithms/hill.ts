import chunk from 'lodash/chunk';
import matMulVec from '../matMulVec';

const ALPHABET_LEN = 2 ** 16;
const ALPHABET_SHIFT = 0;

/**
 * Encode the message using Hill Cipher
 * @param msg your message
 * @param key square char matrix
 */
export default function encode(_msg: string, _key: string): string {
   const size = Math.sqrt(_key.length) ^ 0;
   const key = chunk(_key.split('').map(ch => ch.charCodeAt(0)), size);
   const msg = (_msg + _msg).slice(0, Math.ceil(_msg.length / size) * size);
   
   return chunk(msg.split('').map(ch => ch.codePointAt(0)), size)
      .map(m => processMsg(m, key))
      .flatMap(r => r)
      .map(code => String.fromCharCode(code % ALPHABET_LEN + ALPHABET_SHIFT))
      .join('').slice(0, _msg.length)
}

function processMsg(msg: number[], key: number[][]): number[] {
   return matMulVec(key, msg);
}