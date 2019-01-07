import { createModalWindow, closeModalWindow } from '../modalWindow/modalWindow';
import mathExample from '../tasks/math';
import englishTranslate from '../tasks/englishTranslate/englishTranslate';
import makeWord from '../tasks/makeWord';

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

function clearModalWindow(modalWindow) {
  let element = modalWindow.firstChild;
  while (element) {
    modalWindow.removeChild(element);
    element = modalWindow.firstChild;
  }
}

export const kindOfAnimation = {};

function showTasksWindow(event) {
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
      break;
  }

  const modalWindow = document.getElementsByClassName('modal-window')[0];
  clearModalWindow(modalWindow);
  modalWindow.classList.add('choose-task-window');

  createTitle(modalWindow, 'Выберите тип задания: ');
  createSpellButton(modalWindow, 'Математика', mathExample, 'task-type-button');
  createSpellButton(modalWindow, 'Перевод слова', englishTranslate, 'task-type-button');
  createSpellButton(modalWindow, 'Составить слово', makeWord, 'task-type-button');

  let focusIndex = 0;
  let focusedTask = document.getElementsByClassName('task-type-button')[focusIndex];
  focusedTask.focus();
  document.onkeydown = function pressKeyFunc() {
    switch (event.keyCode) {
      case 37:
      case 40:
        focusIndex -= 1;
        if (focusIndex === -1) focusIndex = 2;
        focusedTask = document.getElementsByClassName('task-type-button')[focusIndex];
        focusedTask.focus();
        break;
      case 38:
      case 39:
        focusIndex += 1;
        if (focusIndex === 3) focusIndex = 0;
        focusedTask = document.getElementsByClassName('task-type-button')[focusIndex];
        focusedTask.focus();
        break;
      case 13:
        switch (focusIndex) {
          case 0:
            mathExample();
            break;
          case 1:
            englishTranslate();
            break;
          case 2:
            makeWord();
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };
}

export function showSpellWindow() {
  createModalWindow();
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  modalWindow.classList.add('spell-window');

  createTitle(modalWindow, 'Выберите тип воздействия: ');
  createSpellButton(modalWindow, 'УДАР', showTasksWindow, 'spell-button');
  createSpellButton(modalWindow, 'БРОСОК', showTasksWindow, 'spell-button');
  createSpellButton(modalWindow, 'ЛЕЧЕНИЕ', showTasksWindow, 'spell-button');

  let focusIndex = 0;
  let focusedSpell = document.getElementsByClassName('spell-button')[focusIndex];
  focusedSpell.focus();

  const prevPressKeyFunc = document.onkeydown;
  document.onkeydown = function pressKeyFunc(evt) {
    const event = evt || window.event;
    switch (event.keyCode) {
      case 37:
      case 40:
        focusIndex -= 1;
        if (focusIndex === -1) focusIndex = 2;
        focusedSpell = document.getElementsByClassName('spell-button')[focusIndex];
        focusedSpell.focus();
        break;
      case 38:
      case 39:
        focusIndex += 1;
        if (focusIndex === 3) focusIndex = 0;
        focusedSpell = document.getElementsByClassName('spell-button')[focusIndex];
        focusedSpell.focus();
        break;
      case 13:
        showTasksWindow();
        break;
      case 27:
        document.onkeydown = prevPressKeyFunc;
        if (document.getElementsByClassName('modal-window')[0] !== 'undefined') {
          closeModalWindow();
        }
        break;
      default:
        break;
    }
  };
}
