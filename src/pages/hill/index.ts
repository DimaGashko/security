import 'normalize.scss/normalize.scss';
import './index.scss';
import { encode, decode } from './scripts/algorithms/hill';

window.hillEncode = encode;
window.hillDecode = decode;

const $app: HTMLElement = document.querySelector('.app');

const key = 'do you love code so much?';

const msg = `Harry Potter & 뻈왔땐鱌쌪꘰꼸ꄩ襉꣉秢暉峙噙聛`;

const encoded = encode(msg, key);

console.log(msg);
console.log(encoded);
console.log('-------');
console.log(decode(encoded, key));

initEvents();

function initEvents() {

}

