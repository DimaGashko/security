import 'normalize.scss/normalize.scss';
import './index.scss';
import texts from './texts';

interface TypingParams {
   speed: number,
   error: number,
}

const MAX_RECORD_ERR = 0.20;
const TRUST_EPS = 0.1;

const $: { [type: string]: HTMLElement } = {};

let typingParams: TypingParams = null;
let curMode: 'record' | 'test' = null;
let curText = '';

let typingTime = {
   start: 0,
   finish: 0,
}

getElements();
initEvents();

function initEvents() {
   $.record.addEventListener('click', () => {
      startRecording();
   });

   $.test.addEventListener('click', () => {
      startTesting();
   });

   $.input.addEventListener('keydown', (event) => {
      if (event.keyCode !== 13 || !curMode) return;
      event.preventDefault();

      if (curMode === 'record') finishRecording();
      else if (curMode === 'test') finishTesting();
   });
}

function startRecording() {
   beforeStart();
   curMode = 'record';
}

function startTesting() {
   if (!typingParams) {
      alert('You have to Record you typing params. ' +
         'Click on the Record button first.');

      return;
   }

   beforeStart();
   curMode = 'test';
}

function beforeStart() {
   setControlsDisable(true);
   updateText();

   typingTime.start = Date.now();

   (<HTMLTextAreaElement>$.input).disabled = false;
   (<HTMLTextAreaElement>$.input).value = '';
   $.input.focus();
}

function finishRecording() {
   beforeFinish();

   const newTypingParams = calcTypingParams();
   
   if (newTypingParams.error > MAX_RECORD_ERR) {
      alert('Too many errors. Your typing params are not saved.');
      return;
   }

   typingParams = newTypingParams;
   console.log(typingParams);

   printTypingParams();

   (<HTMLTextAreaElement>$.input).disabled = true;
}

function finishTesting() {
   beforeFinish();

   const speedEps = typingParams.speed * TRUST_EPS;
   const errorEps = typingParams.error * TRUST_EPS;

   const newTypingParams = calcTypingParams();
   console.log(newTypingParams);

   const speedDiff = Math.abs(typingParams.speed - newTypingParams.speed);
   const errorDiff = Math.abs(typingParams.error - newTypingParams.error);

   if (speedDiff > speedEps || errorDiff > errorEps) {
      alert('Failed!');
      return;
   }

   alert("You're Welcome!");
}

function beforeFinish() {
   typingTime.finish = Date.now();
   curMode = null;

   (<HTMLTextAreaElement>$.input).disabled = true;
   setControlsDisable(false);
}

function calcTypingParams(): TypingParams {
   const enteredText = (<HTMLTextAreaElement>$.input).value.trim();
   const time = (typingTime.finish - typingTime.start) / 1000 / 60;
   const rLen = calcRealTextLen(curText);

   const speed = rLen / time;

   const overTypingError = Math.max(0, curText.length - enteredText.length);
   const baseError = curText.split('').reduce((error, char, i) => {
      return error + (enteredText[i] === char ? 0 : 1);
   }, 0);

   const error = (baseError + overTypingError) / curText.length;

   return { speed, error };
}

function calcRealTextLen(text) {
   return text.length;
}

function updateText() {
   const newIndex = Math.round(Math.random() * texts.length);
   curText = texts[newIndex].trim();

   (<HTMLTextAreaElement>$.text).value = curText;
}

function printTypingParams() {
   $.speed.innerHTML = Math.round(typingParams.speed) + '';
   $.errors.innerHTML = Math.round(typingParams.error * 10000) / 100 + '';
}

function setControlsDisable(val) {
   (<HTMLButtonElement>$.record).disabled = val;
   (<HTMLButtonElement>$.test).disabled = val;
}

function getElements() {
   $.root = document.querySelector('.app-main');
   $.record = $.root.querySelector('.record');
   $.test = $.root.querySelector('.test');
   $.speed = $.root.querySelector('.speed');
   $.errors = $.root.querySelector('.errors');
   $.text = $.root.querySelector('.text');
   $.input = $.root.querySelector('.input');
}