import $ from 'jquery';
import '../../node_modules/jquery-ui/ui/widgets/sortable';
import { clearModalWindow, createTaskText, createTaskButton, randNum, makeSpell } from './tasksModalWindowElements';
import { showSpellWindow } from '../createSpellWindow/createSpellWindow';

window.$ = $;
const str = 'Соберите слово из букв:';
const wordsArr = ['yellow', 'blue', 'white', 'black', 'pink', 'red'];

let index;
let word;

function create(parent, lettersArr) {
  const ul = document.createElement('ul');
  ul.id = 'sortable';

  const len = lettersArr.length;
  for (let i = 0; i < len; i += 1) {
    const li = document.createElement('li');
    li.classList.add('letters-container');
    li.innerText = lettersArr.splice(randNum(0, lettersArr.length - 1), 1);
    ul.appendChild(li);
  }

  parent.appendChild(ul);
  $(() => $('#sortable').sortable());
  document.getElementsByClassName('letters-container')[0].focus();
}

function checkAnswer() {
  const rightAns = word;
  let userAns = '';
  for (let i = 0; i < word.length; i += 1) {
    userAns += document.getElementsByClassName('letters-container')[i].innerText;
  }
  makeSpell(userAns === rightAns);

  document.onkeydown = function pressKeyFunc(evt) {
    const event = evt || window.event;
    if (event.keyCode === 13) {
      showSpellWindow();
    }
  };
}

export default function makeWord() {
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  index = randNum(0, wordsArr.length - 1);
  word = wordsArr[index];
  const letters = word.split('');

  clearModalWindow(modalWindow);
  createTaskText(modalWindow, str);
  create(modalWindow, letters);
  createTaskButton(modalWindow, checkAnswer);

  document.onkeydown = function pressKeyFunc(evt) {
    const event = evt || window.event;
    if (event.keyCode === 13) {
      checkAnswer();
    }
  };
}
