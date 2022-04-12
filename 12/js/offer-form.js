import { ROOM_TO_GUESTS, OFFER_TYPES, MAX_PRICE, VALIDATION_PRIORITY, latLngMapCenter } from './data.js';
import { createSlider, updateSlider } from './slider.js';
import { onMainPinMarkerMove, mainPinMarker, resetMap } from './map.js';
import { postOffer } from './api.js';
import { filterForm } from './filter-form.js';


const offerForm = document.querySelector('.ad-form');
const numberOfRoomsSelect = offerForm.querySelector('#room_number');
const capacitySelect = offerForm.querySelector('#capacity');
const sliderElement = offerForm.querySelector('.ad-form__slider');
const priceField = offerForm.querySelector('#price');
const typeSelect = offerForm.querySelector('#type');
const timeInSelect = offerForm.querySelector('#timein');
const timeOutSelect = offerForm.querySelector('#timeout');
const addressField = offerForm.querySelector('#address');
const submitButton = offerForm.querySelector('.ad-form__submit');
const resetButton = offerForm.querySelector('.ad-form__reset');

const initialType = typeSelect.value;

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'form__error-text'
});

const setPriceAttributes = (type) => {
  const minPrice = OFFER_TYPES[type].min;
  priceField.min = minPrice;
  priceField.placeholder = minPrice;
};

setPriceAttributes(initialType);

const priceUISlider = createSlider(
  sliderElement,
  parseInt(priceField.min, 10),
  () => {
    priceField.value = priceUISlider.get();
    pristine.validate(priceField);
  });

const resetPage = () => {
  offerForm.reset();
  filterForm.reset();
  pristine.reset();
  mainPinMarker.setLatLng(latLngMapCenter);
  resetMap();
  updateSlider(priceUISlider, parseInt(priceField.min, 10), priceField.min);
};

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

const onTimeInChange = () => {
  timeOutSelect.value = timeInSelect.value;
};

const onTimeOutChange = () => {
  timeInSelect.value = timeOutSelect.value;
};

const onTypeChange = () => {
  const type = typeSelect.value;
  setPriceAttributes(type);
  if (priceField.value) {
    updateSlider(priceUISlider, parseInt(priceField.min, 10), priceField.value);
    pristine.validate(priceField);
  } else {
    updateSlider(priceUISlider, parseInt(priceField.min, 10), priceField.min);
  }
};

const onResetButtonClick = () => {
  resetPage();
};

// слушатели
capacitySelect.addEventListener('change', onCapacityChange);

priceField.addEventListener('input', () => {
  if (pristine.validate(priceField)) {
    priceUISlider.set(parseInt(priceField.value, 10));
  }
});

typeSelect.addEventListener('change', onTypeChange);

timeInSelect.addEventListener('change', onTimeInChange);
timeOutSelect.addEventListener('change', onTimeOutChange);

resetButton.addEventListener('click', onResetButtonClick);

onMainPinMarkerMove(addressField);

pristine.addValidator(
  priceField,
  validatePrice,
  getPriceErrorMessage,
  VALIDATION_PRIORITY,
  true
);

pristine.addValidator(
  numberOfRoomsSelect,
  validateCapacity,
  getCapacityErrorMessage
);

// управление кнопкой загрузки объявления
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    postOffer(formData, resetPage).then(unblockSubmitButton);
  }
});

export { offerForm };
