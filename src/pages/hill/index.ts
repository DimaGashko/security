import 'normalize.scss/normalize.scss';
import './index.scss';
import { encode, decode } from './scripts/algorithms/hill';
import matMulVec from './scripts/algorithms/math/matMulVec';
import invertMat from './scripts/algorithms/math/modInvMat';
import det from './scripts/algorithms/math/det';
import modInvMat from './scripts/algorithms/math/modInvMat';

window.hillEncode = encode;
window.hillDecode = decode;
window.mulV = matMulVec;
window.inv = modInvMat;
window.det = det;

const $app: HTMLElement = document.querySelector('.app');

const key = 'Do You Love Code So Much?';

const msg = `濝亯Ỉ뵔킝㋔㗅㓋㐰㙔`;

const encoded = encode(msg, key);

console.log(msg);
console.log(encoded);
console.log('-------');
console.log(decode(encoded, key));

initEvents();

function initEvents() {

}

