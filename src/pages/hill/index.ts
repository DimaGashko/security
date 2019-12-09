import 'normalize.scss/normalize.scss';
import './index.scss';
import { encode, decode } from './scripts/algorithms/hill';

const $app: HTMLElement = document.querySelector('.app');

const key = 'do you love code so much?';

const msg = `Harry Potter and the Philosophers Stone`;

window.hillEncode = encode;
window.hillDecode = decode;

const encoded = encode(msg, key);

console.log(msg);
console.log(encoded);
console.log(decode(encoded, key));

initEvents();

function initEvents() {

}

