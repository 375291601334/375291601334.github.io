import { createModalWindow } from '../modalWindow/modalWindow';
import startGame from '../startGame/startGame';
import { pressEnterAndEscHandler } from '../playWithKeyboard/keyPressHandlers';

function createTextAboutRegistration(parent) {
  const div = document.createElement('div');
  div.classList.add('registration-div-with-text');
  const text = '<p>Добро пожаловать в «Заколдованное Королевство».</p>'
    + '<p>Вас ждут захватывающие сражения и сложные задания.'
    + 'Вы можете улучшать свои навыки, сражаясь с безжалостными монстрами.</p>'
    + '<p>Вперед, на встречу приключениям!</p>';
  div.innerHTML = text;
  parent.appendChild(div);
}

function createLabel(parent) {
  const label = document.createElement('label');
  label.classList.add('registration-label');
  label.innerText = 'Ведите Ваше имя: ';
  label.htmlFor = 'registration-input';
  parent.appendChild(label);
}

function createRegistrationInput(parent) {
  const input = document.createElement('input');
  input.classList.add('registration-input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Рыцарь Джек');
  input.id = 'registration-input';
  parent.appendChild(input);
  input.focus();
}

function saveName() {
  let name = document.getElementById('registration-input').value;
  if (name === '') { name = 'Аноним'; }
  if (localStorage.getItem('RecordsArr') === null) {
    const newRecArr = [{ name: `${name}`, killedMonsersAmmount: 0 }];
    localStorage.setItem('RecordsArr', JSON.stringify(newRecArr));
  } else {
    const recArr = JSON.parse(localStorage.getItem('RecordsArr'));
    arr.push({ name: `${name}`, killedMonsersAmmount: 0 });
    localStorage.setItem('RecordsArr', JSON.stringify(recArr));
  }
}

function showGameWindow() {
  let element = document.body.firstChild;
  while (element) {
    document.body.removeChild(element);
    element = document.body.firstChild;
  }
  startGame();
}

function goToGameWindow() {
  saveName();
  showGameWindow();
}

function createPlayButton(parent) {
  const button = document.createElement('button');
  button.classList.add('play-button');
  button.innerHTML = 'Играть!';
  parent.appendChild(button);
  button.addEventListener('click', saveName);
  button.addEventListener('click', showGameWindow);
}

export default function showRegistrationWindow() {
  createModalWindow();
  const modalWindow = document.getElementsByClassName('modal-window')[0];

  createTextAboutRegistration(modalWindow);
  createLabel(modalWindow);
  createRegistrationInput(modalWindow);
  createPlayButton(modalWindow);
  pressEnterAndEscHandler(goToGameWindow);
}
