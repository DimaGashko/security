import 'normalize.scss/normalize.scss';
import './index.scss';
import { encode } from './algorithms/playfair/encode';

const ALPHABET = "абвгдеєжзиіїйклмнопрстуфхцчшщьюя'._".split('');
const DELIMITER = "'";

console.log(encode('cluster', 'meet me tomorrow'));

initEvents();

function initEvents() {
  
}
