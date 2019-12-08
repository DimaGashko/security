import 'normalize.scss/normalize.scss';
import './index.scss';
import PlayfairGrid from './algorithms/playfair/PlayfairGrid';

const grid = PlayfairGrid.createEnGrid('cluster');
console.log(grid);

window.PlayfairGrid = PlayfairGrid;

//console.log(encode('cluster', 'meet me tomorrow'));

initEvents();

function initEvents() {
  
}


