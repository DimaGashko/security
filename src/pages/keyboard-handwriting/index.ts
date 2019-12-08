import 'normalize.scss/normalize.scss';
import './index.scss';

const $: { [type: string]: HTMLElement } = {};
$.root = document.querySelector('.app-main');
$.record = $.root.querySelector('.record');
$.test = $.root.querySelector('.test');
$.speed = $.root.querySelector('.speed');
$.accuracy = $.root.querySelector('.accuracy');
$.text = $.root.querySelector('.text');
$.input = $.root.querySelector('.input');