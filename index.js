const addTextButton = document.querySelector('#addTextButton');
const addTextInput = document.querySelector('#addTextInput');
const dictionary = document.querySelector('#dictionary');
const containerRuList = document.getElementsByClassName('container ru');
const containerTrList = document.getElementsByClassName('container tr');

// Добавляет текст в список по кнопке и по Enter
addTextButton.addEventListener('click', addText);
addTextInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    addText();
  }
});

function addText() {
  const text = addTextInput.value;
  if (text.length === 0) {
    return;
  }

  const { newContainerRu } = createNewContainer();
  const { newContainerTr } = createNewContainer();
  const { elTextRu } = createTextBlocks(text);
  const { elTextTr } = createTextBlocks(text);
  const { elNumOfRowRu } = createNumOfRow();
  const { elNumOfRowTr } = createNumOfRow();
  const { elDeleteButtonRu } = createDeleteButton();
  const { elDeleteButtonTr } = createDeleteButton();

  newContainerRu.appendChild(elNumOfRowRu);
  newContainerRu.appendChild(elTextRu);
  newContainerRu.appendChild(elDeleteButtonRu);

  newContainerTr.appendChild(elNumOfRowTr);
  newContainerTr.appendChild(elTextTr);
  newContainerTr.appendChild(elDeleteButtonTr);

  dictionary.appendChild(newContainerRu);
  dictionary.appendChild(newContainerTr);
}

// Создает контейнер для новой строки
function createNewContainer() {
  const newContainerRu = document.createElement('div');
  newContainerRu.setAttribute('class', 'container ru');

  const newContainerTr = document.createElement('div');
  newContainerTr.setAttribute('class', 'container tr');

  return { newContainerRu, newContainerTr };
}

// Создает блоки с текстом
function createTextBlocks(text) {
  const elTextRu = document.createElement('div');
  const elTextTr = document.createElement('div');

  elTextRu.setAttribute('class', 'word ru');
  elTextTr.setAttribute('class', 'word tr');

  elTextRu.innerText = text;
  cropText(elTextRu);
  addPopUp(elTextRu);

  translit(text).then((result) => {
    elTextTr.innerText = result;
    cropText(elTextTr);
    addPopUp(elTextTr);
  });

  return { elTextRu, elTextTr };
}

// Создает блоки с номером строки
function createNumOfRow() {
  const elNumOfRowRu = document.createElement('div');
  const elNumOfRowTr = document.createElement('div');

  elNumOfRowRu.setAttribute('class', 'numOfRow ru');
  elNumOfRowTr.setAttribute('class', 'numOfRow tr');
  elNumOfRowRu.innerText = `${containerRuList.length + 1}`;
  elNumOfRowTr.innerText = `${containerTrList.length + 1}`;

  return { elNumOfRowRu, elNumOfRowTr };
}

// Создает кнопку удаления строки
function createDeleteButton() {
  const elDeleteButtonRu = document.createElement('img');

  elDeleteButtonRu.setAttribute('src', './icons/deleteButton.png');
  elDeleteButtonRu.setAttribute('alt', 'deleteButton ru');
  elDeleteButtonRu.setAttribute('class', 'deleteButton ru active');

  elDeleteButtonRu.addEventListener('click', (event) => {
    event.target.parentElement.nextSibling.remove();
    event.target.parentElement.remove();
    for (let i = 0; i < dictionary.childElementCount; i += 1) {
      document.getElementsByClassName('numOfRow ru')[i].innerText = i + 1;
      document.getElementsByClassName('numOfRow tr')[i].innerText = i + 1;
    }
  });

  const elDeleteButtonTr = document.createElement('img');

  elDeleteButtonTr.setAttribute('src', './icons/deleteButton.png');
  elDeleteButtonTr.setAttribute('alt', 'deleteButton tr');
  elDeleteButtonTr.setAttribute('class', 'deleteButton tr active');
  elDeleteButtonTr.addEventListener('click', (event) => {
    event.target.parentElement.previousSibling.remove();
    event.target.parentElement.remove();
    for (let i = 0; i < dictionary.childElementCount; i += 1) {
      document.getElementsByClassName('numOfRow ru')[i].innerText = i + 1;
      document.getElementsByClassName('numOfRow tr')[i].innerText = i + 1;
    }
  });

  return { elDeleteButtonRu, elDeleteButtonTr };
}

// Кнопка удаления всех строк
const deleteAllButton = document.querySelector('#deleteAllButton');
deleteAllButton.addEventListener('click', () => {
  document
    .querySelectorAll('#dictionary .container:not(:first-child) + .ru')
    .forEach((el) => el.remove());
  document
    .querySelectorAll('#dictionary .container:not(:first-child) + .tr')
    .forEach((el) => el.remove());
});

// Обрезает текст по количеству символов, по умолчанию 7
// И пишет полный текст в title
function cropText(input, num = 7) {
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

function addPopUp(input) {
  if (input.getAttribute('title') !== null) {
    input.addEventListener('mouseover', showPopUp);
    input.addEventListener('mouseout', hidePopUp);
  }
}

function showPopUp(event) {
  popUp.innerText = event.target.getAttribute('title');
  popUp.style.display = 'block';
  popUp.style.left = `${event.target.getBoundingClientRect().left + 18}px`;
  popUp.style.top = `${event.target.getBoundingClientRect().top - 32}px`;
}

function hidePopUp() {
  popUp.style.display = 'none';
}

// Транслит
function translit(text) {
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
