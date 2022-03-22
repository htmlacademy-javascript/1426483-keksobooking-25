import { ROOMTOGUESTS } from './data.js';

const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'form__error-text'
});

// валидация поля ввода Заголовка объявления
function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  offerForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

// валидация поля ввода Цены за ночь
function validatePrice (value) {
  return value <= 100000;
}

pristine.addValidator(
  offerForm.querySelector('#price'),
  validatePrice,
  'Максимальное значение — 100 000'
);

const numberOfRoomsSelect = offerForm.querySelector('#room_number');
const capacitySelect = offerForm.querySelector('#capacity');

// функция проверки соотвествия кол-ва комнат кол-ву гостей
function validateCapacity() {
  return ROOMTOGUESTS[numberOfRoomsSelect.value].includes(capacitySelect.value);
}

// функция генерации сообщений об ошибке
function getCapacityErrorMessage () {
  const roomsSelectedOption = numberOfRoomsSelect.options[numberOfRoomsSelect.selectedIndex];
  const guestsSelectedOption = capacitySelect.options[capacitySelect.selectedIndex];
  return `
    ${roomsSelectedOption.textContent}
    ${roomsSelectedOption.textContent === '1 комната' ? 'не подходит' : 'не подходят'}
    ${guestsSelectedOption.value !== '0' ? guestsSelectedOption.textContent : ''}
  `;
}

pristine.addValidator(
  numberOfRoomsSelect,
  validateCapacity,
  getCapacityErrorMessage
);

//обработчик события выбора кол-ва комнат
const onSelectChange = function () {
  pristine.validate(numberOfRoomsSelect);
};

numberOfRoomsSelect.addEventListener('change', onSelectChange);
capacitySelect.addEventListener('change', onSelectChange);

offerForm.addEventListener('input', () => {
  const isValid = pristine.validate();
  offerForm.querySelector('.ad-form__submit').disabled = !isValid;
});

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


const  deactivateFieldset = (fieldset) => {
  fieldset.disabled = true;
};

const activateFieldset = (fieldset) => {
  fieldset.disabled = false;
};

const deactivateForms = () => {
  offerForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');

  offerFormFieldsets.forEach(deactivateFieldset);

  filterFormFieldsets.forEach(deactivateFieldset);
};

const activateForms = () => {
  offerForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');

  offerFormFieldsets.forEach(activateFieldset);

  filterFormFieldsets.forEach(activateFieldset);
};

export {deactivateForms, activateForms};
