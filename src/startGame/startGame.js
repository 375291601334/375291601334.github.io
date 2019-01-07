import createCharacters from '../createCharacter/createCharacter';
import createMonsterName from '../createCharacter/createMonsterName';
import { showSpellWindow } from '../createSpellWindow/createSpellWindow';
import createHealthBar from '../charactersHealth/createHealthBar';

function createCanvas(parent) {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  canvas.width = 1893;
  canvas.height = 1076;
  parent.appendChild(canvas);
}

function createAttackButton(parent) {
  const button = document.createElement('div');
  button.classList.add('attack-button');
  button.innerText = 'НАНЕСТИ УДАР!';
  parent.appendChild(button);
  document.getElementsByClassName('attack-button')[0].addEventListener('click', showSpellWindow);
}

export default function createGameSpace() {
  const container = document.createElement('div');
  container.classList.add('game-container');
  document.body.appendChild(container);

  const healthContainer = document.createElement('div');
  healthContainer.classList.add('health-container');
  container.appendChild(healthContainer);

  const recArr = JSON.parse(localStorage.getItem('RecordsArr'));
  createHealthBar(healthContainer, recArr[recArr.length - 1].name);
  createHealthBar(healthContainer, createMonsterName());
  createAttackButton(container);
  createCanvas(container);
  createCharacters();

  document.onkeydown = function pressKeyFunc(evt) {
    const event = evt || window.event;
    if (event.keyCode === 13) {
      showSpellWindow();
    }
  };
}
