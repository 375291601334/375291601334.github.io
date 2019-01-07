import { clearModalWindow, createTaskText, createTaskInput, createTaskButton, randNum, makeSpell } from '../tasksModalWindowElements';
import isBlank from '../validation';
import wordsArr from './dictionary';
import { showSpellWindow } from '../../createSpellWindow/createSpellWindow';

let index;
let word;

function checkAnswer() {
  const userAns = document.getElementsByClassName('task-input')[0].value;
  if (!isBlank(userAns)) {
    const rightAns = wordsArr[index][word];
    makeSpell(rightAns.indexOf(userAns) !== -1);
  }

  document.onkeydown = function pressKeyFunc(evt) {
    const event = evt || window.event;
    if (event.keyCode === 13) {
      showSpellWindow();
    }
  };
}

export default function mathExample() {
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  index = randNum(0, wordsArr.length - 1);
  word = Object.keys(wordsArr[index])[0];
  const str = `Переведите слово: ${word}`;

  clearModalWindow(modalWindow);
  createTaskText(modalWindow, str);
  createTaskInput(modalWindow);
  const input = document.getElementsByClassName('task-input')[0];
  input.focus();
  createTaskButton(modalWindow, checkAnswer);

  document.onkeydown = function pressKeyFunc(evt) {
    const event = evt || window.event;
    if (event.keyCode === 13) {
      checkAnswer();
    }
  };
}
