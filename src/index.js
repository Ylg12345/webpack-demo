import './css/index.css';
import icon from './img/1.jpg';

import createHeading from './heading.js';
import createEditor from './editor.js';

import about from './about.md';

import { Button } from './component';

const container = document.querySelector('.container');

const heading = createHeading();
const editor = createEditor();

const img = document.createElement('img');

img.src = icon;

const fragment = document.createDocumentFragment();

fetch('/api/users')
  .then((res) => res.json())
  .then((data) => {
    data.forEach(item => {
      const h3 = document.createElement('h3');
      h3.textContent = item.login;
      fragment.append(h3);
    });
    container.appendChild(fragment);
})

container.appendChild(heading);
container.appendChild(img);
container.appendChild(editor);

container.appendChild(Button());

document.body.append(container);

// 以下用来处理HMR, 与业务逻辑无关

if(module.hot) {

  let lastEditor = editor;

  module.hot.accept('./editor.js', () => {
  
    const value = lastEditor.value;
    container.removeChild(lastEditor);
    const newEditor = createEditor();
    newEditor.value = value;
    container.appendChild(newEditor);
    lastEditor = newEditor;
  })
}
