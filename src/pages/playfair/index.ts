import 'normalize.scss/normalize.scss';
import './index.scss';
import PlayfairGrid from './algorithms/playfair/PlayfairGrid';

const $app: HTMLElement = document.querySelector('.app');
const $auth: HTMLButtonElement = $app.querySelector('.actions__auth');
const $decode: HTMLButtonElement = $app.querySelector('.actions__decode');
const $db: HTMLElement = $app.querySelector('.db__content');

const $addForm: HTMLFormElement = $app.querySelector('.add');
const $login: HTMLInputElement = $addForm.login;
const $name: HTMLInputElement = $addForm.username;
const $pwd: HTMLInputElement = $addForm.pwd;

const playfairGrid = PlayfairGrid.createEnGrid('cluster');

initEvents();

function initEvents() {
   $auth.addEventListener('click', () => {
      auth();
   });

   $decode.addEventListener('click', () => {
      decode();
   });

   $addForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addUser();
   });
}

function auth() {
   console.log('auth');
}

function decode() {
   console.log('decode');
   
}

function addUser() {
   const data = {
      login: $login.value.trim(),
      name: $name.value.trim(),
      pwd: $pwd.value.trim(),
   }

   console.log(data);
}
