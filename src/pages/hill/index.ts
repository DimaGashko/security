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

const key = 'do you love code';

const msg = `Harry і їы`;

const encoded = encode(msg, key);

console.log(msg);
console.log(encoded);
console.log('-------');
console.log(decode(encoded, key));

initEvents();

function initEvents() {

}

