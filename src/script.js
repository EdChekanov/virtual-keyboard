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
    this.isCtrlOn = false;
    this.isAltOn = false;
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
    const data = this.data.filter(
      (item) => item.type === 'char' || item.type === 'ruchar'
    );
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.RU').classList.remove('hidden');
      }
    });
  }

  switchToSmallRu() {
    const data = this.data.filter(
      (item) => item.type === 'char' || item.type === 'ruchar'
    );
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.ru').classList.remove('hidden');
      }
    });
  }

  switchToBigEnSymbol() {
    const data = this.data.filter(
      (item) => item.type === 'symbol' || item.type === 'ruchar'
    );
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.EN').classList.remove('hidden');
      }
    });
  }

  switchToSmallEnSymbol() {
    const data = this.data.filter(
      (item) => item.type === 'symbol' || item.type === 'ruchar'
    );
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.en').classList.remove('hidden');
      }
    });
  }

  switchToBigRuSymbol() {
    const data = this.data.filter((item) => item.type === 'symbol');
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.RU').classList.remove('hidden');
      }
    });
  }

  switchToSmallRuSymbol() {
    const data = this.data.filter((item) => item.type === 'symbol');
    data.forEach((item) => {
      const div = this.keyboard.querySelector(`.${item.name}`);
      for (const el of div.children) {
        if (!el.classList.contains('hidden')) el.classList.add('hidden');
        div.querySelector('.ru').classList.remove('hidden');
      }
    });
  }

  changeLanguage() {
    this.isEnglishON = !this.isEnglishON;
    localStorage.setItem('isEnglish', this.isEnglishON);
    if (this.isEnglishON) {
      this.switchToSmallEn();
      this.switchToSmallEnSymbol();
    } else {
      this.switchToSmallRu();
      this.switchToSmallRuSymbol();
    }
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
        const keySpan = Array.from(key.children).filter(
          (el) => !el.classList.contains('hidden')
        )[0];
        this.display.value += keySpan.textContent;
      } else {
        if (this.data.find((item) => item.name === e.code).value === 'Shift') {
          this.isShiftOn = true;
          if (this.isEnglishON) {
            this.switchToBigEnSymbol();
            if (!this.isCapsOn) {
              this.switchToBigEn();
            } else {
              this.switchToSmallEn();
            }
          } else {
            this.switchToBigRuSymbol();
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
        if (this.data.find((item) => item.name === e.code).value === 'Enter') {
          this.display.value += '\n';
        }
        if (this.data.find((item) => item.name === e.code).value === 'Ctrl') {
          this.isCtrlOn = true;
        }
        if (this.data.find((item) => item.name === e.code).value === 'Alt') {
          this.isAltOn = true;
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
            this.switchToSmallEnSymbol();
            if (!this.isCapsOn) {
              this.switchToSmallEn();
            } else {
              this.switchToBigEn();
            }
          } else {
            this.switchToSmallRuSymbol();
            if (!this.isCapsOn) {
              this.switchToSmallRu();
            } else {
              this.switchToBigRu();
            }
          }
        }
        if (this.data.find((item) => item.name === e.code).value === 'Ctrl') {
          this.isCtrlOn = false;
          if (this.isAltOn) {
            this.changeLanguage();
          }
        }
        if (this.data.find((item) => item.name === e.code).value === 'Alt') {
          this.isAltOn = false;
          if (this.isCtrlOn) {
            this.changeLanguage();
          }
        }
        if (
          this.data.find((item) => item.name === e.code).value === 'CapsLock'
        ) {
          this.isCapsOn = !this.isCapsOn;
          if (this.isEnglishON) {
            if (this.isCapsOn) {
              this.switchToBigEn();
            } else {
              this.switchToSmallEn();
            }
          } else {
            if (this.isCapsOn) {
              this.switchToBigRu();
            } else {
              this.switchToSmallRu();
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
