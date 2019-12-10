import chunk from 'lodash/chunk';
import 'normalize.scss/normalize.scss';
import './index.scss';

import { debounce } from 'throttle-debounce';
import { encode, decode } from './scripts/hill';

const $app: HTMLElement = document.querySelector('.app');
const $key: HTMLInputElement = $app.querySelector('.key');
const $msg: HTMLTextAreaElement = $app.querySelector('.msg');
const $encodeMsg: HTMLTextAreaElement = $app.querySelector('.encoded-msg');
const $decodeMsg: HTMLTextAreaElement = $app.querySelector('.decoded-msg');
const $charKey: HTMLTextAreaElement = $app.querySelector('.char-key');
const $numKey: HTMLTextAreaElement = $app.querySelector('.num-key');

const INPUT_DELAY = 200;

run();
updateCharKeyNumKey();
initEvents();

function initEvents() {
   $key.addEventListener('input', debounce(INPUT_DELAY, () => {
      run();
      updateCharKeyNumKey();
   }));

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

function updateCharKeyNumKey() {
   const key = $key.value.trim();
   const size = Math.sqrt(key.length) ^ 0;
   const charKey = chunk(key.slice(0, size * size).split(''), size);
   const numKey = chunk(key.slice(0, size * size).split('')
      .map(ch => ch.codePointAt(0)), size);

   $charKey.value = keyToString(charKey);
   $numKey.value = keyToString(numKey);
}

function keyToString(key: any[][]) {
   return key.map(r => r.join('\t')).join('\n');
}
