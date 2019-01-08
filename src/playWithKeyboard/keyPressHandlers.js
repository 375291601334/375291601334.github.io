import { closeModalWindow } from '../modalWindow/modalWindow';

const ENTER_KEYCODE = 13;
const ESC_KEYCODE = 27;
const prevPressKeyFunc;

export function pressEnterHandler(func) {
  document.onkeydown = function pressKeyFunc(evt) {
    const event = evt || window.event;
    if (event.keyCode === ENTER_KEYCODE) {
      func();
    }
  };
}

export function pressEnterAndEscHandler(func) {
  prevPressKeyFunc = document.onkeydown;
  document.onkeydown = function pressKeyFunc(evt) {
    const event = evt || window.event;
    if (event.keyCode === ENTER_KEYCODE) {
      func();
    } else if (event.keyCode === ESC_KEYCODE) {
      document.onkeydown = prevPressKeyFunc;
      if (document.getElementsByClassName('modal-window')[0] !== 'undefined') {
        closeModalWindow();
      }
    }
  };
}

export function pressEnterAndEscAndArrowsHandler(funcOnEnter, className) {
  let focusIndex = 0;
  let focusedElement = document.getElementsByClassName(`${className}`)[focusIndex];
  focusedElement.focus();
  prevPressKeyFunc = document.onkeydown;
  
  document.onkeydown = function pressKeyFunc(evt) {
    const event = evt || window.event;
    switch (event.keyCode) {
      case LEFT_KEYCODE:
      case DOWN_KEYCODE:
        focusIndex -= 1;
        if (focusIndex === -1) focusIndex = 2;
        focusedElement = document.getElementsByClassName(`${className}`)[focusIndex];
        focusedElement.focus();
        break;
      case UP_KEYCODE:
      case RIGHT_KEYCODE:
        focusIndex += 1;
        if (focusIndex === 3) focusIndex = 0;
        focusedElement = document.getElementsByClassName(`${className}`)[focusIndex];
        focusedElement.focus();
        break;
      case ENTER_KEYCODE:
        funcOnEnter();
        break;
      case ESC_KEYCODE:
        document.onkeydown = prevPressKeyFunc;
        if (document.getElementsByClassName('modal-window')[0] !== 'undefined') {
          closeModalWindow();
        }
        break;
      default:
        break;
    }
  }
}