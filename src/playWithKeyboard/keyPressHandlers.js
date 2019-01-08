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
