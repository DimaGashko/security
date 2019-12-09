import 'normalize.scss/normalize.scss';
import './index.scss';
import encode from './scripts/algorithms/hill';

const $app: HTMLElement = document.querySelector('.app');

console.log(encode('secret message', 'do you love code so much?'));


initEvents();

function initEvents() {

}

