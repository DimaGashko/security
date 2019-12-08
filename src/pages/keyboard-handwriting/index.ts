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

let keyPressedTimes: number[] = [];

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

   $.input.addEventListener('input', (event) => {
      keyPressedTimes.push(Date.now());
   });

   $.input.addEventListener('keydown', (event) => {
      if (event.keyCode !== 13 || !curMode) return;
      event.preventDefault();

      if (curMode === 'record') finishRecording();
      else if (curMode === 'test') finishTesting();
   });
}

function startRecording() {
   const confirmMsd = 'Old recorded data will be removed. Start recording?';
   if (typingParams && !confirm(confirmMsd)) return;

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

   keyPressedTimes.length = 0;

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

   if (newTypingParams.speed > 2000) {
      alert("Don't cheat!")
      startRecording();
      return;
   }

   typingParams = newTypingParams;

   printTypingParams();

   (<HTMLTextAreaElement>$.input).disabled = true;
}

function finishTesting() {
   beforeFinish();

   const prev = typingParams;
   const cur = calcTypingParams();

   const speedEps = Math.abs(prev.speed * TRUST_EPS);
   const errorEps = Math.abs(prev.error * TRUST_EPS);

   const speedDiff = Math.abs(prev.speed - cur.speed);
   const errorDiff = Math.abs(prev.error - cur.error);

   const speedDiffPercent = Math.min(+(speedDiff / prev.speed * 100).toFixed(2) || 0, 100);
   const errorsDiffPercent = Math.min(+(errorDiff / prev.error * 100).toFixed(2) || 0, 100);

   const pass = speedDiff <= speedEps && errorDiff <= errorEps;

   const msg = `Recorded speed: ${formatSpeed(prev.speed)} ch/min, errors: ${formatErrors(prev.error)}%\n` +
      `Current speed: ${formatSpeed(cur.speed)} ch/min, errors: ${formatErrors(cur.error)}%\n` +
      `Speed diff: ${speedDiffPercent}%, Errors diff: ${errorsDiffPercent}%\n\n` +
      `${(pass) ? "Passed. You're Welcome!" : 'Failed!'}`;
   
   if (cur.speed > 2000) {
      alert("Don't cheat!")
      return;
   }

   alert(msg);
}

function beforeFinish() {
   typingTime.start = keyPressedTimes[0];
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
   return text.split('').reduce((len, char) => {
      return len + (/[A-Z-А-ЯЄЇІ!"№;%:?*\(\),]/.test(char)) ? 2 : 1;
   }, 0);
}

function updateText() {
   const newIndex = Math.round(Math.random() * (texts.length - 1));
   curText = texts[newIndex].trim();

   (<HTMLTextAreaElement>$.text).value = curText;
}

function printTypingParams() {
   $.speed.innerHTML = formatSpeed(typingParams.speed);
   $.errors.innerHTML = formatErrors(typingParams.error);
}

function formatSpeed(val) {
   return Math.round(val) + '';
}

function formatErrors(val) {
   return +(val * 100).toFixed(2) + '';
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