import 'normalize.scss/normalize.scss';
import './index.scss';

import template from 'lodash/template';

import PlayfairGrid from './scripts/algorithms/playfair/PlayfairGrid';
import { encode } from './scripts/algorithms/playfair';

import userTemplateText from './templates/users';

interface User {
   login: string;
   name: string;
   pwd: string;
}

const KEYWORD = 'cluster';

const $app: HTMLElement = document.querySelector('.app');
const $auth: HTMLButtonElement = $app.querySelector('.actions__auth');
const $decode: HTMLButtonElement = $app.querySelector('.actions__decode');
const $db: HTMLElement = $app.querySelector('.db__content');

const $addForm: HTMLFormElement = $app.querySelector('.add');
const $login: HTMLInputElement = $addForm.login;
const $name: HTMLInputElement = $addForm.username;
const $pwd: HTMLInputElement = $addForm.pwd;

const playfairGrid = PlayfairGrid.createEnGrid(KEYWORD);

const users: User[] = ('users' in localStorage) ?
   JSON.parse(localStorage.users) : []

const userTemplate = template(userTemplateText);

renderUsers();
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
   const login = $login.value.trim();
   const name = $name.value.trim();
   const pwd = encode($pwd.value.trim(), playfairGrid);

   saveUser({ login, name, pwd });
   renderUsers();
}

function saveUser(user: User) {
   users.push(user);
   localStorage.users = JSON.stringify(users);
}

function renderUsers() {
   $db.innerHTML = userTemplate(users);
}
