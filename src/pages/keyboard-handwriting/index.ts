import 'normalize.scss/normalize.scss';
import './index.scss';
import texts from './texts';

interface RecordedData {
   speed: number,
   accuracy: number,
}

const $: { [type: string]: HTMLElement } = {};
const recordedData: RecordedData = null;
const curMode: 'record' | 'test' = null;
const curText = '';

getElements();
initEvents();

function initEvents() {
   $.record.addEventListener('click', () => {
      startRecording();
   });

   $.test.addEventListener('click', () => {
      startTesting();
   })
}

function startRecording() {
   setControlsDisable(true);

   setControlsDisable(false);
}

function startTesting() {
   if (!recordedData) {
      alert('You have to record you keyboard handwriting first');
      return;
   }

   setControlsDisable(true);

   

   setControlsDisable(false);
}

function setControlsDisable(val) {
   (<HTMLButtonElement>$.record).disabled = val;
   (<HTMLButtonElement>$.test).disabled = val;
}

function getRandomText() {
   const index = Math.round(Math.random() * texts.length);
   return texts[index];
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