import {
  animationShow,
  animationAddRow,
  animationDeleteRow,
  animationPushButton,
} from './animations.js';
import {
  createNewContainer,
  createTextBlocks,
  createNumOfRow,
  createDeleteButton,
} from './createFunctions.js';

const addTextButton = document.querySelector('#addTextButton');
export const addTextInput = document.querySelector('#addTextInput');
export const dictionary = document.querySelector('#dictionary');
export const containerRuList = document.getElementsByClassName('container ru');
export const containerTrList = document.getElementsByClassName('container tr');
addTextInput.focus();

// Добавляет текст в список по кнопке и по Enter
addTextButton.addEventListener('click', () => {
  animationPushButton(addTextButton);
  addText();
});
addTextInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    addText();
  }
});

function addText() {
  // Проверка содержимого input
  const text = addTextInput.value;
  if (text.length === 0) {
    return;
  }
  // Создание элементов
  const { newContainerRu } = createNewContainer();
  const { newContainerTr } = createNewContainer();
  const { elTextRu } = createTextBlocks(text);
  const { elTextTr } = createTextBlocks(text);
  const { elNumOfRowRu } = createNumOfRow();
  const { elNumOfRowTr } = createNumOfRow();
  const { elDeleteButtonRu } = createDeleteButton();
  const { elDeleteButtonTr } = createDeleteButton();
  // Заполнение контейнеров
  newContainerRu.appendChild(elNumOfRowRu);
  newContainerRu.appendChild(elTextRu);
  newContainerRu.appendChild(elDeleteButtonRu);
  newContainerTr.appendChild(elNumOfRowTr);
  newContainerTr.appendChild(elTextTr);
  newContainerTr.appendChild(elDeleteButtonTr);
  // Добавление контейнеров в таблицу
  dictionary.appendChild(newContainerRu);
  dictionary.appendChild(newContainerTr);
  // Очистка и фокус input
  addTextInput.value = '';
  addTextInput.focus();
  //
  animationAddRow(newContainerRu);
  animationAddRow(newContainerTr);
}

// Кнопка удаления всех строк
const deleteAllBlock = document.querySelector('#deleteAllBlock');
deleteAllBlock.addEventListener('click', () => {
  addTextInput.focus();
  animationPushButton(deleteAllBlock);
  //
  const addedTextRu = document.querySelectorAll(
    '#dictionary .container:not(:first-child) + .ru'
  );
  const addedTextTr = document.querySelectorAll(
    '#dictionary .container:not(:first-child) + .tr'
  );
  addedTextRu.forEach((el) => animationDeleteRow(el));
  addedTextTr.forEach((el) => animationDeleteRow(el));
});

// Обрезает текст по количеству символов, по умолчанию 7
// И пишет полный текст в title
export function cropText(input, num = 7) {
  if (input.innerText.length > num) {
    input.setAttribute('title', `${input.innerText}`);
    input.innerText = `${input.innerText.substring(0, num)}...`;
  }
}

// Всплывающая подсказка, показывает полный текст из title
// только у обрезанного текста
const popUp = document.createElement('div');
popUp.setAttribute('class', 'popUp');
document.body.appendChild(popUp);

export function addPopUp(input) {
  if (input.getAttribute('title') !== null) {
    input.addEventListener('mouseover', showPopUp);
    input.addEventListener('mouseout', hidePopUp);
  }
}

function showPopUp(event) {
  popUp.innerText = event.target.getAttribute('title');
  popUp.style.display = 'block';
  popUp.style.left = `${event.target.getBoundingClientRect().left + 18}px`;
  popUp.style.bottom = `${
    document.documentElement.clientHeight -
    event.target.getBoundingClientRect().bottom +
    32
  }px`;
  animationShow(popUp);
}

function hidePopUp() {
  popUp.style.display = 'none';
}

// Транслит
export function translit(text) {
  const arr = text.split('');
  const result = [];

  return fetch('./converter.json')
    .then((response) => response.json())
    .then((converter) => {
      for (let i = 0; i < arr.length; i += 1) {
        if (Object.keys(converter).includes(arr[i])) {
          // Если кириллица, то делает транслит
          result.push(converter[arr[i]]);
        } else {
          // Если не кириллица, оставляет букву как есть
          result.push(arr[i]);
        }
      }
      return result.join('');
    });
}
