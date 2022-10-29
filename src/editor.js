import './css/editor.css';

export default () => {

  const element = document.createElement('input');
  element.classList.add('editor');
  element.id = 'editor';
  element.value = '';
  
  console.log('init completed !');

  return element;
}