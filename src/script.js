import './index.html';
import './style.scss';

import data from './keyboard.json';

document.addEventListener('keydown', (e) => {
  for (let key in data) console.log(data[key]);
});
