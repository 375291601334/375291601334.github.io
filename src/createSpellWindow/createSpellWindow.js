import { createModalWindow, clearElement } from '../modalWindow/modalWindow';
import mathExample from '../tasks/math';
import englishTranslate from '../tasks/englishTranslate/englishTranslate';
import makeWord from '../tasks/makeWord';
import makeSentence from '../tasks/makeSentence';
import wordByPicture from '../tasks/wordByPicture';
import audition from '../tasks/audition';
import { pressEnterAndEscAndArrowsHandler } from '../playWithKeyboard/keyPressHandlers';

export const kindOfAnimation = {};

function createTitle(parent, text) {
  const title = document.createElement('h3');
  title.innerText = text;
  parent.appendChild(title);
}

function createSpellButton(parent, text, func, className) {
  const button = document.createElement('button');
  button.classList.add(className);
  button.innerHTML = text;
  parent.appendChild(button);
  button.addEventListener('click', func);
}

function chooseTaskWithKeyboard() {
  if (document.getElementsByClassName('task-type-button')[0] === document.activeElement) {
    mathExample();
    return;
  }
  if (document.getElementsByClassName('task-type-button')[1] === document.activeElement) {
    englishTranslate();
    return;
  }
  if (document.getElementsByClassName('task-type-button')[2] === document.activeElement) {
    makeWord();
    return;
  }
  if (document.getElementsByClassName('task-type-button')[3] === document.activeElement) {
    makeSentence();
    return;
  }
  if (document.getElementsByClassName('task-type-button')[4] === document.activeElement) {
    audition();
    return;
  }
  if (document.getElementsByClassName('task-type-button')[5] === document.activeElement) {
    wordByPicture();
    return;
  }
  // default value
  mathExample();
}

function showTasksWindow(evt) {
  const event = evt || window.event;
  switch (event.target) {
    case document.getElementsByClassName('spell-button')[0]:
      kindOfAnimation.animation = 'playerGoingToHit';
      break;
    case document.getElementsByClassName('spell-button')[1]:
      kindOfAnimation.animation = 'playerThrowingGun';
      break;
    case document.getElementsByClassName('spell-button')[2]:
      kindOfAnimation.animation = 'addPlayerHealth';
      break;
    default:
      kindOfAnimation.animation = 'playerGoingToHit';
      break;
  }
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  clearElement(modalWindow);
  modalWindow.classList.add('choose-task-window');
  createTitle(modalWindow, 'Выберите тип задания: ');
  createSpellButton(modalWindow, 'Математика', mathExample, 'task-type-button');
  createSpellButton(modalWindow, 'Перевод слова', englishTranslate, 'task-type-button');
  createSpellButton(modalWindow, 'Составить слово', makeWord, 'task-type-button');
  createSpellButton(modalWindow, 'Составить предложение', makeSentence, 'task-type-button');
  createSpellButton(modalWindow, 'Аудирование', audition, 'task-type-button');
  createSpellButton(modalWindow, 'Слово по картинке', wordByPicture, 'task-type-button');
  pressEnterAndEscAndArrowsHandler(chooseTaskWithKeyboard, 'task-type-button', false);
}

export function showSpellWindow() {
  createModalWindow();
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  modalWindow.classList.add('spell-window');
  createTitle(modalWindow, 'Выберите тип воздействия: ');
  createSpellButton(modalWindow, 'УДАР', showTasksWindow, 'spell-button');
  document.getElementsByClassName('spell-button')[0].autofocus = true;
  createSpellButton(modalWindow, 'БРОСОК', showTasksWindow, 'spell-button');
  createSpellButton(modalWindow, 'ЛЕЧЕНИЕ', showTasksWindow, 'spell-button');
  pressEnterAndEscAndArrowsHandler(showTasksWindow, 'spell-button', true);
}
