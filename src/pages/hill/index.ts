import 'normalize.scss/normalize.scss';
import './index.scss';

import { debounce } from 'throttle-debounce';
import { matMulVec, modInvMat, det } from './scripts/math';
import { encode, decode } from './scripts/hill';

window.hillEncode = encode;
window.hillDecode = decode;
window.mulV = matMulVec;
window.inv = modInvMat;
window.det = det;

const key = 'do_you_love_code_so_much?';

let msg = `Harry Potter and the Philosophers Stone

Chapter 1 The Boy Who Lived

Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you'd expect to be involved in anything strange or mysterious, because they just didn't hold with such nonsense.

Mr. Dursley was the director of a firm called Grunnings, which made drills. He was a big, beefy man with hardly any neck, although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son called Dudley and in their opinion there was no finer boy anywhere.

The Dursleys had everything they wanted, but they also had a secret, and their greatest fear was that somebody would discover it. They didn't think they could bear it if anyone found out about the Potters. Mrs. Potter was Mrs. Dursley's sister, but they hadn't met for several years; in fact, Mrs. Dursley pretended she didn't have a sister, because her sister and her good-for-nothing husband were as unDursleyish as it was possible to be. The Dursleys shuddered to think what the neighbors would say if the Potters arrived in the street. The Dursleys knew that the Potters had a small son, too, but they had never even seen him. This boy was another good reason for keeping the Potters away; they didn't want Dudley mixing with a child like that.

Type your text here...`;

msg = 'Some secret message!';

const encoded = encode(msg, key);

// console.log(msg);
// console.log(encoded);
// console.log('-------');
// console.log(decode(encoded, 'do_you_love_code_so_much?'));

const $app: HTMLElement = document.querySelector('.app');
const $key: HTMLInputElement = $app.querySelector('.key');
const $msg: HTMLTextAreaElement = $app.querySelector('.msg');
const $encodeMsg: HTMLTextAreaElement = $app.querySelector('.encoded-msg');
const $decodeMsg: HTMLTextAreaElement = $app.querySelector('.decoded-msg');

const INPUT_DELAY = 200;

run();
initEvents();

function initEvents() {
   $key.addEventListener('input', debounce(INPUT_DELAY, run));
   $msg.addEventListener('input', debounce(INPUT_DELAY, run));
   $encodeMsg.addEventListener('input', debounce(INPUT_DELAY, run));
   $decodeMsg.addEventListener('input', debounce(INPUT_DELAY, run));
}

function run() {
   const key = $key.value.trim();
   const msg = $msg.value.trim();
   const encodedMsg = encode(msg, key);
   const decodedMsg = decode(encodedMsg, key);

   $encodeMsg.value = encodedMsg;
   $decodeMsg.value = decodedMsg;   
}

