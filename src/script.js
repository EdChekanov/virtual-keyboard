import './index.html';
import 'normalize.scss/normalize.scss';
import './style.scss';

import data from './keyboard.json';

class Keyboard {
  constructor(data) {
    this.data = data;
    this.body = document.querySelector('body');
    this.header = '<h1 class="heading">Virtual keyboard</h1>';
    this.display = '<textarea class="display" readonly></textarea>';
    this.keyboard = '<div class="keyboard"></div>';
    this.info = `<p class="info">Клавиатура создана в операционной системе Windows<br/>
      Для переключения языка комбинация: левые ctrl + alt</p>`;
    this.isShiftOn = false;
    this.isCapsOn = false;
    this.isEnglishON = localStorage.getItem('isEnglish')
      ? localStorage.getItem('isEnglish')
      : true;
  }

  generateKeys() {
    this.data.forEach((item) => {
      const button = `<div class="keyboard__key ${item.name}${
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

  switchToBigEn() {
    const data = this.data.filter((item) => item.type === 'char');
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.EN').classList.remove('hidden');
      }
    });
  }

  switchToSmallEn() {
    const data = this.data.filter((item) => item.type === 'char');
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.en').classList.remove('hidden');
      }
    });
  }

  switchToBigRu() {
    const data = this.data.filter((item) => (item.type === 'char') | 'ruchar');
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.RU').classList.remove('hidden');
      }
    });
  }

  switchToSmallRu() {
    const data = this.data.filter((item) => (item.type === 'char') | 'ruchar');
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.ru').classList.remove('hidden');
      }
    });
  }

  addEvents() {
    window.addEventListener('keydown', (e) => {
      const key = this.keyboard.querySelector(`.${e.code}`);
      if (!key) return;
      e.preventDefault();
      key.classList.add('active');

      if (
        !(this.data.find((item) => item.name === e.code).type === 'control')
      ) {
        if (this.isEnglishON) {
          if (this.isShiftOn === this.isCapsOn) {
            this.display.value += key.querySelector('.en').textContent;
          } else {
            this.display.value += key.querySelector('.EN').textContent;
          }
        } else {
          if (this.isShiftOn === this.isCapsOn) {
            this.display.value += key.querySelector('.ru').textContent;
          } else {
            this.display.value += key.querySelector('.RU').textContent;
          }
        }
      } else {
        if (this.data.find((item) => item.name === e.code).value === 'Shift') {
          this.isShiftOn = true;
          if (this.isEnglishON) {
            if (!this.isCapsOn) {
              this.switchToBigEn();
            } else {
              this.switchToSmallEn();
            }
          } else {
            if (!this.isCapsOn) {
              this.switchToBigRu();
            } else {
              this.switchToSmallRu();
            }
          }
        }
        if (
          this.data.find((item) => item.name === e.code).value === 'Backspace'
        ) {
          let textareaText = this.display.value;
          this.display.value = textareaText.slice(0, textareaText.length - 1);
        }
        if (this.data.find((item) => item.name === e.code).value === 'Tab') {
          this.display.value += '  ';
        }
      }
    });
    window.addEventListener('keyup', (e) => {
      if (!this.keyboard.querySelector(`.${e.code}`)) return;
      this.keyboard.querySelector(`.${e.code}`).classList.remove('active');

      if (
        !(this.data.find((item) => item.name === e.code).type === 'control')
      ) {
      } else {
        if (this.data.find((item) => item.name === e.code).value === 'Shift') {
          this.isShiftOn = false;
          if (this.isEnglishON) {
            if (!this.isCapsOn) {
              this.switchToSmallEn();
            } else {
              this.switchToBigEn();
            }
          } else {
            if (!this.isCapsOn) {
              this.switchToSmallRu();
            } else {
              this.switchToBigRu();
            }
          }
        }
      }
    });
  }

  start() {
    this.body.innerHTML += this.header;
    this.body.innerHTML += this.display;
    this.body.innerHTML += this.keyboard;
    this.body.innerHTML += this.info;

    this.display = document.querySelector('.display');
    this.keyboard = document.querySelector('.keyboard');

    this.generateKeys();
    this.addEvents();
  }
}

const app = new Keyboard(data);

app.start();
