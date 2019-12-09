import chunk from 'lodash/chunk';
import matMulVec from '../matMulVec';

// There's method String.fromCharCode() that returns char by its code
// This method is looped: String.fromCharCode('a'.charCodeAt() + 2 ** 16) // a
// So, that's mean we don't need calc any mod in this cipher

/**
 * Encode the message using Hill Cipher
 * @param msg your message
 * @param key square char matrix
 */
export default function encode(_msg: string, _key: string): string {
   const size = Math.sqrt(_key.length) ^ 0;
   const key = chunk(_key.split('').map(ch => ch.charCodeAt(0)), size);
   const msg = (_msg + _msg).slice(0, Math.ceil(_msg.length / size) * size);
   console.log(_msg, msg);
   
   return chunk(msg.split('').map(ch => ch.codePointAt(0)), size)
      .map(m => processMsg(m, key))
      .flatMap(code => String.fromCharCode(code))
}

function processMsg(msg: number[], key: number[][]): number[] {
   console.log(key, msg);
   
   return matMulVec(key, msg);
}