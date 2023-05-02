import './index.html';
import 'normalize.scss/normalize.scss';
import './style.scss';

import data from './keyboard.json';

class Keyboard {
  constructor(data) {
    this.data = data;
    this.body = document.querySelector('body');
    this.header = '<h1 class="heading">Virtual keyboard</h1>';
    this.display = '<textarea class="display"></textarea>';
    this.keyboard = '<div class="keyboard"></div>';
    this.info = `<p class="info">Клавиатура создана в операционной системе Windows<br/>
      Для переключения языка комбинация: левые ctrl + alt</p>`;
      this.isShiftOn = false;
      this.isCapsOn = false;
      this.isEnglishON = true;
  }

  start() {
    this.body.innerHTML += this.header;
    this.body.innerHTML += this.display;
    this.body.innerHTML += this.keyboard;
    this.body.innerHTML += this.info;

    this.keyboard = document.querySelector('.keyboard');

    this.data.forEach((item) => {
      const button = `<div class="keyboard__key${
        item.type === 'control' ? ' ' + `control-key ${item.name}` : ''
      }${item.name === 'Space' ? ' ' + item.name : ''}">
      <span class="en ${this.isEnglishON ? '' : 'hidden'}">${
        typeof item.value === 'string' ? item.value : item.value.en
      }</span>
      <span class="EN hidden">${
        typeof item.value === 'string' ? item.value : item.value.EN
      }</span>
      <span class="ru ${this.isEnglishON ? 'hidden' : ''}">${
        typeof item.value === 'string' ? item.value : item.value.ru
      }</span>
      <span class="RU hidden">${
        typeof item.value === 'string' ? item.value : item.value.RU
      }</span></div>`;
      this.keyboard.innerHTML += button;
    });
  }
}

const app = new Keyboard(data);
app.start();
