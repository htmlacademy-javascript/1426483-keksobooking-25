import {  ROOM_TO_GUESTS } from './data.js';

const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'form__error-text'
});

const numberOfRoomsSelect = offerForm.querySelector('#room_number');
const capacitySelect = offerForm.querySelector('#capacity');

// функция проверки соотвествия кол-ва комнат кол-ву гостей
function validateCapacity() {
  return  ROOM_TO_GUESTS[numberOfRoomsSelect.value].includes(capacitySelect.value);
}

// функция генерации сообщений об ошибке
function getCapacityErrorMessage () {
  const roomsSelectedOption = numberOfRoomsSelect.options[numberOfRoomsSelect.selectedIndex];
  const guestsSelectedOption = capacitySelect.options[capacitySelect.selectedIndex];
  return `
    ${roomsSelectedOption.textContent}
    ${roomsSelectedOption.textContent === '1 комната' ? 'не подходит' : 'не подходят'}
    ${guestsSelectedOption.value !== '0' ? guestsSelectedOption.textContent : 'для вашего варианта'}
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

capacitySelect.addEventListener('change', onSelectChange);

offerForm.addEventListener('submit', (evt) => {
  if (pristine.validate()) {
    return;
  }
  evt.preventDefault();
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
