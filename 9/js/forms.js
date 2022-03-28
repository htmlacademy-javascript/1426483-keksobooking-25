import { ROOM_TO_GUESTS, MIN_PRICE } from './data.js';

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
const validateCapacity = () => ROOM_TO_GUESTS[numberOfRoomsSelect.value].includes(capacitySelect.value);


// функция генерации сообщений об ошибке
const getCapacityErrorMessage = () => {
  const roomsSelectedOption = numberOfRoomsSelect.options[numberOfRoomsSelect.selectedIndex];
  const guestsSelectedOption = capacitySelect.options[capacitySelect.selectedIndex];
  return `
    ${roomsSelectedOption.textContent}
    ${roomsSelectedOption.textContent === '1 комната' ? 'не подходит' : 'не подходят'}
    ${guestsSelectedOption.value !== '0' ? guestsSelectedOption.textContent : 'для вашего варианта'}
  `;
};

pristine.addValidator(
  numberOfRoomsSelect,
  validateCapacity,
  getCapacityErrorMessage
);

// обработчик события выбора кол-ва комнат
const onCapacityChange = () => {
  pristine.validate(numberOfRoomsSelect);
};

capacitySelect.addEventListener('change', onCapacityChange);

// валидатор поля ввода цены
const priceField = offerForm.querySelector('#price');
priceField.min ='5000';

const validatePrice = (value) => (value >= Number(priceField.min));

const getPriceErrorMessage = () => {
  if (!priceField.value) {
    return 'Введите число';
  }
  return `Значение не может быть меньше ${priceField.min}`;
};

pristine.addValidator(
  priceField,
  validatePrice,
  getPriceErrorMessage
);


// обработка пользовательского ввода для поля Тип жилья
const typeSelect = offerForm.querySelector('#type');

const onTypeChange = () => {
  const errorText = priceField.closest('.ad-form__element').querySelector('.form__error-text');
  priceField.value = '';
  priceField.placeholder = MIN_PRICE[typeSelect.value];
  priceField.min = MIN_PRICE[typeSelect.value];
  if (errorText) {
    errorText.textContent = '';
  }
};

typeSelect.addEventListener('change', onTypeChange);

// обработка пользовательского ввода для полей Время заезда и выезда
const timeInSelect = offerForm.querySelector('#timein');
const timeOutSelect = offerForm.querySelector('#timeout');

const onTimeInChange = () => {
  timeOutSelect.value = timeInSelect.value;
};

const onTimeOutChange = () => {
  timeInSelect.value = timeOutSelect.value;
};

timeInSelect.addEventListener('change', onTimeInChange);
timeOutSelect.addEventListener('change', onTimeOutChange);

// валидация формы перед отправкой
offerForm.addEventListener('submit', (evt) => {
  if (pristine.validate()) {
    return;
  }
  evt.preventDefault();
});

// активация форм
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
