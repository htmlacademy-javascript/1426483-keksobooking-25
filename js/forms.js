import { ROOM_TO_GUESTS, MIN_PRICE, MAX_PRICE} from './data.js';
import { createSlider, updateSlider } from './slider.js';
import { addMainPinMarkerHandlers } from './map.js';

const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');
const numberOfRoomsSelect = offerForm.querySelector('#room_number');
const capacitySelect = offerForm.querySelector('#capacity');
const sliderElement = offerForm.querySelector('.ad-form__slider');
const priceField = offerForm.querySelector('#price');
const typeSelect = offerForm.querySelector('#type');
const timeInSelect = offerForm.querySelector('#timein');
const timeOutSelect = offerForm.querySelector('#timeout');
const addressField = offerForm.querySelector('#address');

// const points = createOffers();

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'form__error-text'
});

const priceUISlider = createSlider(sliderElement, priceField, pristine.validate(priceField));

// функции валидации
const validatePrice = (value) => {
  const price = Number(value || 0);
  const inRange = price >= Number(priceField.min) && price <= MAX_PRICE;
  return /^\d+$/.test(value) && inRange;
};

const validateCapacity = () => ROOM_TO_GUESTS[numberOfRoomsSelect.value].includes(capacitySelect.value);

// функции генерации сообщений об ошибке
const getPriceErrorMessage = () => `Выберите число между ${priceField.min} и ${MAX_PRICE}`;

const getCapacityErrorMessage = () => {
  const roomsSelectedOption = numberOfRoomsSelect.options[numberOfRoomsSelect.selectedIndex];
  const guestsSelectedOption = capacitySelect.options[capacitySelect.selectedIndex];
  return `
    ${roomsSelectedOption.textContent}
    ${roomsSelectedOption.textContent === '1 комната' ? 'не подходит' : 'не подходят'}
    ${guestsSelectedOption.value !== '0' ? guestsSelectedOption.textContent : 'для вашего варианта'}
  `;
};

// обработчики событий
const onCapacityChange = () => {
  pristine.validate(numberOfRoomsSelect);
};

const setPriceAttributes = () => {
  const minPrice = MIN_PRICE[typeSelect.value];
  priceField.min = minPrice;
  priceField.placeholder = minPrice;
};

const onTypeChange = () => {
  setPriceAttributes();
  updateSlider(sliderElement, +MIN_PRICE[typeSelect.value]);
};

const onTimeInChange = () => {
  timeOutSelect.value = timeInSelect.value;
};

const onTimeOutChange = () => {
  timeInSelect.value = timeOutSelect.value;
};

// слушатели
capacitySelect.addEventListener('change', onCapacityChange);

priceField.addEventListener('input', () => {
  if (priceField.value.length === 0) {
    return;
  }
  priceUISlider.set(parseInt(priceField.value, 10));
});

// addSliderHandlers(priceField, pristine.validate(priceField));
priceUISlider.on('update', () => {
  priceField.value = priceUISlider.get();
  pristine.validate(priceField);
});

typeSelect.addEventListener('change', onTypeChange);

timeInSelect.addEventListener('change', onTimeInChange);
timeOutSelect.addEventListener('change', onTimeOutChange);


setPriceAttributes();

pristine.addValidator(
  priceField,
  validatePrice,
  getPriceErrorMessage,
);

pristine.addValidator(
  numberOfRoomsSelect,
  validateCapacity,
  getCapacityErrorMessage
);

addMainPinMarkerHandlers(addressField);
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
