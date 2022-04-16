import { ROOM_TO_GUESTS, OFFER_TYPES, MAX_PRICE, VALIDATION_PRIORITY } from './const.js';
import { createSlider, updateSlider } from './slider.js';
import { onMainPinMarkerMove } from './map.js';
import { postOffer } from './api.js';

const offerFormElement = document.querySelector('.ad-form');
const numberOfRoomsSelectElement = offerFormElement.querySelector('#room_number');
const capacitySelectElement = offerFormElement.querySelector('#capacity');
const sliderElement = offerFormElement.querySelector('.ad-form__slider');
const priceFieldElement = offerFormElement.querySelector('#price');
const typeSelectElement = offerFormElement.querySelector('#type');
const timeInSelectElement = offerFormElement.querySelector('#timein');
const timeOutSelectElement = offerFormElement.querySelector('#timeout');
const addressFieldElement = offerFormElement.querySelector('#address');
const submitButtonElement = offerFormElement.querySelector('.ad-form__submit');

const initialType = typeSelectElement.value;

const pristine = new Pristine(offerFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'form__error-text'
});

const setPriceAttributes = (type) => {
  const minPrice = OFFER_TYPES[type].min;
  priceFieldElement.min = minPrice;
  priceFieldElement.placeholder = minPrice;
};

setPriceAttributes(initialType);

const priceUISlider = createSlider(
  sliderElement,
  parseInt(priceFieldElement.min, 10),
  () => {
    priceFieldElement.value = priceUISlider.get();
    pristine.validate(priceFieldElement);
  });

// функции валидации
const validatePrice = (value) => {
  const price = Number(value || 0);
  const inRange = price >= Number(priceFieldElement.min) && price <= MAX_PRICE;
  return /^\d+$/.test(value) && inRange;
};

const validateCapacity = () => ROOM_TO_GUESTS[numberOfRoomsSelectElement.value].includes(capacitySelectElement.value);

// функции генерации сообщений об ошибке
const getPriceErrorMessage = () => `Выберите число между ${priceFieldElement.min} и ${MAX_PRICE}`;

const getCapacityErrorMessage = () => {
  const roomsSelectedOption = numberOfRoomsSelectElement.options[numberOfRoomsSelectElement.selectedIndex];
  const guestsSelectedOption = capacitySelectElement.options[capacitySelectElement.selectedIndex];
  return `
    ${roomsSelectedOption.textContent}
    ${roomsSelectedOption.textContent === '1 комната' ? 'не подходит' : 'не подходят'}
    ${guestsSelectedOption.value !== '0' ? guestsSelectedOption.textContent : 'для вашего варианта'}
  `;
};

// обработчики событий
const onCapacityChange = () => {
  pristine.validate(numberOfRoomsSelectElement);
};

const onTimeInChange = () => {
  timeOutSelectElement.value = timeInSelectElement.value;
};

const onTimeOutChange = () => {
  timeInSelectElement.value = timeOutSelectElement.value;
};

const onTypeChange = () => {
  const type = typeSelectElement.value;
  setPriceAttributes(type);
  if (priceFieldElement.value) {
    updateSlider(priceUISlider, parseInt(priceFieldElement.min, 10), priceFieldElement.value);
    pristine.validate(priceFieldElement);
  } else {
    updateSlider(priceUISlider, parseInt(priceFieldElement.min, 10), priceFieldElement.min);
  }
};

// слушатели
capacitySelectElement.addEventListener('change', onCapacityChange);

priceFieldElement.addEventListener('input', () => {
  if (pristine.validate(priceFieldElement)) {
    priceUISlider.set(parseInt(priceFieldElement.value, 10));
  }
});

typeSelectElement.addEventListener('change', onTypeChange);

timeInSelectElement.addEventListener('change', onTimeInChange);
timeOutSelectElement.addEventListener('change', onTimeOutChange);

const setResetButtonClick = (cb) => {
  offerFormElement.addEventListener('reset', () => {
    offerFormElement.reset();
    pristine.reset();
    updateSlider(priceUISlider, parseInt(priceFieldElement.min, 10), priceFieldElement.min);
    cb();
  });
};

onMainPinMarkerMove(addressFieldElement);

pristine.addValidator(
  priceFieldElement,
  validatePrice,
  getPriceErrorMessage,
  VALIDATION_PRIORITY,
  true
);

pristine.addValidator(
  numberOfRoomsSelectElement,
  validateCapacity,
  getCapacityErrorMessage
);

// управление кнопкой загрузки объявления
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

offerFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    postOffer(formData, () => offerFormElement.reset()).then(unblockSubmitButton);
  }
});

export { offerFormElement, setResetButtonClick };
