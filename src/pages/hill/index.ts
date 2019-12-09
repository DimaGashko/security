import 'normalize.scss/normalize.scss';
import './index.scss';

import { debounce } from 'throttle-debounce';
import { matMulVec, modInvMat, det } from './scripts/math';
import { encode, decode } from './scripts/hill';

const $app: HTMLElement = document.querySelector('.app');
const $encodeKey: HTMLInputElement = $app.querySelector('.encode-key');
const $encodeMsg: HTMLTextAreaElement = $app.querySelector('.encode-msg');
const $encodeRes: HTMLTextAreaElement = $app.querySelector('.encode-res');
const $decodeKey: HTMLInputElement = $app.querySelector('.decode-key');
const $decodeMsg: HTMLTextAreaElement = $app.querySelector('.decode-msg');
const $decodeRes: HTMLTextAreaElement = $app.querySelector('.decode-res');

const INPUT_DELAY = 500

runEncode();
runDecode();
initEvents();

function initEvents() {
   $encodeKey.addEventListener('input', debounce(INPUT_DELAY, runEncode));
   $encodeMsg.addEventListener('input', debounce(INPUT_DELAY, runEncode));
   $encodeRes.addEventListener('input', debounce(INPUT_DELAY, runEncode));

   $decodeKey.addEventListener('input', debounce(INPUT_DELAY, runDecode));
   $decodeMsg.addEventListener('input', debounce(INPUT_DELAY, runDecode));
   $decodeRes.addEventListener('input', debounce(INPUT_DELAY, runDecode));
}

function runEncode() {
   const key = $encodeKey.value;
   const msg = $encodeMsg.value; 
   
   try {
      $encodeRes.value = encode(msg, key);
   } catch (e) {
      console.error(e);
      alert('Try another key')
   }
   
}

function runDecode() {
   const key = $decodeKey.value;
   const msg = $decodeMsg.value; 
   
   try {
      $decodeRes.value = decode(msg, key); 
   } catch (e) {
      console.error(e);
      alert('Try another key')
   }
}

