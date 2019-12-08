import 'normalize.scss/normalize.scss';
import './index.scss';
import texts from './texts';

interface RecordedData {
   speed: number,
   accuracy: number,
}

const $: { [type: string]: HTMLElement } = {};
const recordedData: RecordedData = null;

let curMode: 'record' | 'test' = null;
let curText = '';

getElements();
initEvents();

function initEvents() {
   $.record.addEventListener('click', () => {
      startRecording();
   });

   $.test.addEventListener('click', () => {
      startTesting();
   });

   $.input.addEventListener('input', () => {

   });

   $.input.addEventListener('keyup', (event) => {
      if (event.keyCode !== 13) return;
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
   if (!recordedData) {
      alert('You have to Record you keyboard handwriting first');
      return;
   }

   beforeStart();
   curMode = 'test';
}

function beforeStart() {
   $.input.focus();
   setControlsDisable(true);
   updateText();
}

function finishRecording() {
   afterFinish();
}

function finishTesting() {
   afterFinish();
}

function afterFinish() {
   setControlsDisable(false);
   curMode = null;
}

function setControlsDisable(val) {
   (<HTMLButtonElement>$.record).disabled = val;
   (<HTMLButtonElement>$.test).disabled = val;
}

function updateText() {
   const newIndex = Math.round(Math.random() * texts.length);
   curText = texts[newIndex];

   (<HTMLTextAreaElement>$.text).value = curText;
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