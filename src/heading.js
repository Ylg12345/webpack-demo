import './css/heading.css';

export default () => {
  const element = document.createElement('h1');
  element.textContent = 'Hello Webpack';
  element.classList.add('heading');
  element.addEventListener('click', () => {
    alert('Hello Webpack');
  });

  return element;
}