import 'normalize.scss/normalize.scss';
import './index.scss';

import template from 'lodash/template';

import PlayfairGrid from './scripts/algorithms/playfair/PlayfairGrid';
import { encode, decode } from './scripts/algorithms/playfair';

interface User {
   login: string;
   pwd: string;
   about: string;
}

const KEYWORD = 'cluster';

const $app: HTMLElement = document.querySelector('.app');
const $auth: HTMLButtonElement = $app.querySelector('.actions__auth');
const $decode: HTMLButtonElement = $app.querySelector('.actions__decode');
const $db: HTMLElement = $app.querySelector('.db__content');
const $userTmpl: HTMLElement = $app.querySelector('.user-tmpl')

const $addForm: HTMLFormElement = $app.querySelector('.add');
const $login: HTMLInputElement = $addForm.login;
const $pwd: HTMLInputElement = $addForm.pwd;
const $about: HTMLTextAreaElement = $addForm.about;

const playfairGrid = PlayfairGrid.createEnGrid(KEYWORD);

const users: User[] = ('users' in localStorage) ?
   JSON.parse(localStorage.users) : []

const userTemplate = template($userTmpl.innerHTML);

renderUsers();
initEvents();

function initEvents() {
   $auth.addEventListener('click', () => {
      auth();
   });

   $decode.addEventListener('click', () => {
      decodeUser();
   });

   $addForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addUser();
   });
}

function auth() {
   const login = prompt('Login', '');
   const pwd = prompt('Password', '');

   const user = users.find(({ login: cLogin }) => login === cLogin);

   if (!user) {
      alert('User not found');
      return;
   }

   if (encode(pwd, playfairGrid) !== user.pwd) {
      alert('Wrong password!');
      return;
   }

   alert(`Success!\nLogin: ${login}\nAbout: ${user.about}`);
}

function decodeUser() {
   const login = prompt('Login', '');
   const user = users.find(({ login: cLogin }) => login === cLogin);

   if (!user) {
      alert('User not found');
      return;
   }

   const pwd = decode(user.pwd, playfairGrid);
   alert(`Login: ${login}\nEncoded password: ${user.pwd}\n` +
      `Decoded password: ${pwd}`);
}

function addUser() {
   const login = $login.value.trim();
   const pwd = encode($pwd.value.trim(), playfairGrid);
   const about = $about.value.trim();

   if (users.find(({ login: l }) => login === l)) {
      alert('User already exist');
      return;
   }

   saveUser({ login, pwd, about });
   renderUsers();

   $addForm.reset();
   $login.focus();
}

function saveUser(user: User) {
   users.push(user);
   localStorage.users = JSON.stringify(users);
}

function renderUsers() {
   $db.innerHTML = userTemplate({ users });
}
