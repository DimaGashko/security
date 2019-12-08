import 'normalize.scss/normalize.scss';
import './index.scss';
import texts from './texts';

interface TypingParams {
   speed: number,
   error: number,
}

const $: { [type: string]: HTMLElement } = {};
const typingParams: TypingParams = null;

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
      alert('You have to Record you keyboard handwriting. ' +
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

   const typingParams = calcTypingParams();
   console.log(typingParams);

   (<HTMLTextAreaElement>$.input).disabled = true;
}

function finishTesting() {
   beforeFinish();
}

function beforeFinish() {
   typingTime.finish = Date.now();
   curMode = null;

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

   const error = baseError + overTypingError;

   return { speed, error };
}

function calcRealTextLen(text) {
   return text.length;
}

function updateText() {
   const newIndex = Math.round(Math.random() * texts.length);
   curText = texts[newIndex, 0].trim();

   (<HTMLTextAreaElement>$.text).value = curText;
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
   $.accuracy = $.root.querySelector('.accuracy');
   $.text = $.root.querySelector('.text');
   $.input = $.root.querySelector('.input');
}