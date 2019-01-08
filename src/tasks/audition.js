import { createTaskText, createTaskInput, createTaskButton, randNum, makeSpell } from './tasksModalWindowElements';
import isBlank from './validation';
import wordsArr from './englishTranslate/dictionary';
import { showSpellWindow } from '../createSpellWindow/createSpellWindow';
import { pressEnterHandler } from '../playWithKeyboard/keyPressHandlers';
import { clearElement } from '../modalWindow/modalWindow';

let index;
let word;

function checkAnswer() {
  pressEnterHandler(showSpellWindow);
  const userAns = document.getElementsByClassName('task-input')[0].value.toLowerCase();
  if (!isBlank(userAns)) {
    const rightAns = word;
    makeSpell(rightAns === userAns);
  }
}

function tellingWord(text) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  synth.speak(utterThis);
}

export default function audition() {
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  index = randNum(0, wordsArr.length - 1);
  word = Object.keys(wordsArr[index])[0];
  const str = 'Запишите услышанное слово:';
  clearElement(modalWindow);
  createTaskText(modalWindow, str);
  createTaskInput(modalWindow);
  const input = document.getElementsByClassName('task-input')[0];
  input.focus();
  createTaskButton(modalWindow, checkAnswer);
  pressEnterHandler(checkAnswer);
  tellingWord(word);
}
