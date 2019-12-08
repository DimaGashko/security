import 'normalize.scss/normalize.scss';
import './index.scss';
import PlayfairGrid from './algorithms/playfair/PlayfairGrid';
import { encode, decode } from './algorithms/playfair/playfair';

const grid = PlayfairGrid.createEnGrid('cluster');

window.PlayfairGrid = PlayfairGrid;
window.encodePlayfair = encode;
window.decodePlayfair = decode;

initEvents();

function initEvents() {
  
}


