import {
  dictionary,
  addTextInput,
  containerRuList,
  containerTrList,
  cropText,
  addPopUp,
  translit,
} from './index.js';
import { animationDeleteRow } from './animations.js';

// Создает контейнер для новой строки
export function createNewContainer() {
  const newContainerRu = document.createElement('div');
  const newContainerTr = document.createElement('div');
  newContainerRu.setAttribute('class', 'container ru');
  newContainerTr.setAttribute('class', 'container tr');
  //
  return { newContainerRu, newContainerTr };
}

// Создает блоки с текстом
export function createTextBlocks(text) {
  const elTextRu = document.createElement('div');
  const elTextTr = document.createElement('div');
  elTextRu.setAttribute('class', 'word ru');
  elTextTr.setAttribute('class', 'word tr');
  //
  elTextRu.innerText = text;
  cropText(elTextRu);
  addPopUp(elTextRu);
  //
  translit(text).then((result) => {
    elTextTr.innerText = result;
    cropText(elTextTr);
    addPopUp(elTextTr);
  });
  //
  return { elTextRu, elTextTr };
}

// Создает блоки с номером строки
export function createNumOfRow() {
  const elNumOfRowRu = document.createElement('div');
  const elNumOfRowTr = document.createElement('div');
  elNumOfRowRu.setAttribute('class', 'numOfRow ru');
  elNumOfRowTr.setAttribute('class', 'numOfRow tr');
  //
  elNumOfRowRu.innerText = `${containerRuList.length + 1}`;
  elNumOfRowTr.innerText = `${containerTrList.length + 1}`;
  //
  return { elNumOfRowRu, elNumOfRowTr };
}

// Создает кнопку удаления строки
export function createDeleteButton() {
  const elDeleteButtonRu = document.createElement('img');
  elDeleteButtonRu.setAttribute('src', './icons/deleteButton.png');
  elDeleteButtonRu.setAttribute('alt', 'deleteButton ru');
  elDeleteButtonRu.setAttribute('class', 'deleteButton ru active');
  //
  elDeleteButtonRu.addEventListener('click', (event) => {
    addTextInput.focus();
    const parent = event.target.parentElement;
    const parentNext = event.target.parentElement.nextSibling;
    animationDeleteRow(parent);
    animationDeleteRow(parentNext);
    // Переназначение номера строки в таблице
    const timerId = setInterval(() => {
      for (let i = 0; i < dictionary.childElementCount; i += 1) {
        document.getElementsByClassName('numOfRow ru')[i].innerText = i + 1;
        document.getElementsByClassName('numOfRow tr')[i].innerText = i + 1;
      }
    }, 200);
  });
  //
  const elDeleteButtonTr = document.createElement('img');
  elDeleteButtonTr.setAttribute('src', './icons/deleteButton.png');
  elDeleteButtonTr.setAttribute('alt', 'deleteButton tr');
  elDeleteButtonTr.setAttribute('class', 'deleteButton tr active');
  //
  elDeleteButtonTr.addEventListener('click', (event) => {
    addTextInput.focus();
    const parent = event.target.parentElement;
    const parentPrev = event.target.parentElement.previousSibling;
    animationDeleteRow(parent);
    animationDeleteRow(parentPrev);
    // Переназначение номера строки в таблице
    const timerId = setInterval(() => {
      for (let i = 0; i < dictionary.childElementCount; i += 1) {
        document.getElementsByClassName('numOfRow ru')[i].innerText = i + 1;
        document.getElementsByClassName('numOfRow tr')[i].innerText = i + 1;
      }
    }, 200);
  });
  //
  return { elDeleteButtonRu, elDeleteButtonTr };
}
