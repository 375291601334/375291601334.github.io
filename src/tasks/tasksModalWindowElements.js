import { makeAnimationTrue } from '../createCharacter/createCharacter';
import { kindOfAnimation } from '../createSpellWindow/createSpellWindow';
import changeHealthState from '../charactersHealth/changeHealthState';

export function makeSpell(booleanVal) {
  document.getElementsByClassName('modal-window')[0].remove();
  document.getElementsByClassName('modal-window-cover-div')[0].remove();

  if (booleanVal) {
    makeAnimationTrue(kindOfAnimation.animation);
    if (kindOfAnimation.animation === 'addPlayerHealth') {
      if (document.getElementsByClassName('percent-health-bar')[0].innerText !== '100%') {
        changeHealthState('player', 25);
      }
    } else { changeHealthState('monster', -25); }
  } else {
    makeAnimationTrue('monsterGoingToHit');
    changeHealthState('player', -25);
  }
}

export function createTaskText(parent, text) {
  const div = document.createElement('div');
  div.classList.add('task-text');
  div.innerHTML = text;
  parent.appendChild(div);
}

export function createTaskInput(parent) {
  const input = document.createElement('input');
  input.classList.add('task-input');
  input.setAttribute('placeholder', 'Ведите ответ');
  input.id = 'task-input';
  parent.appendChild(input);
}

export function createTaskButton(parent, clickHandler) {
  const button = document.createElement('button');
  button.classList.add('task-button');
  button.innerHTML = 'Ответить';
  parent.appendChild(button);
  button.addEventListener('click', clickHandler);
}

export function clearModalWindow(modalWindow) {
  let element = modalWindow.firstChild;
  while (element) {
    modalWindow.removeChild(element);
    element = modalWindow.firstChild;
  }
}

export function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
