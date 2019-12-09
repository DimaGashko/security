import 'normalize.scss/normalize.scss';
import './index.scss';
import encode from './scripts/algorithms/hill';

const $app: HTMLElement = document.querySelector('.app');

const key = 'do you love code so much?';

const msg = `Harry Potter and the Philosophers Stone`;

console.log(encode(msg, key));


initEvents();

function initEvents() {

}

