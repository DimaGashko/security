import 'normalize.scss/normalize.scss';
import './index.scss';

import template from 'lodash/template';

import PlayfairGrid from './scripts/algorithms/playfair/PlayfairGrid';
import { encode, decode } from './scripts/algorithms/playfair';

interface User {
   login: string;
   name: string;
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
const $name: HTMLInputElement = $addForm.username;
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

   const { name, about } = user;
   alert(`Success!\nLogin: ${login}\nName: ${name}\nAbout: ${about}`);
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
   const name = $name.value.trim();
   const pwd = encode($pwd.value.trim(), playfairGrid);
   const about = $about.value.trim();

   saveUser({ login, name, pwd, about });
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
