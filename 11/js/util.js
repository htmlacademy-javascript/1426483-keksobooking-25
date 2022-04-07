const getRandomInteger = (min, max) => {
  if (min < max && min >= 0) {
    const random = min + Math.random() * (max - min + 1);
    return Math.floor(random);
  }
  return 'Переданы некорректные значения границ интервала';
};

const getRandomRealNumber = (min, max, numOfDecimal) => {
  if (min < max && min >= 0) {
    const random = min + Math.random() * (max - min + 10 ** -numOfDecimal);
    return Number(random.toFixed(numOfDecimal));
  }
  return 'Переданы некорректные значения границ интервала';
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayPart = (arr) => {
  const count = arr.length - 1;
  const rangeLimitOne = getRandomInteger(0, count);
  const rangeLimitTwo = getRandomInteger(0, count);
  if (rangeLimitOne < rangeLimitTwo) {
    return arr.slice(rangeLimitOne, rangeLimitTwo + 1);
  }
  return arr.slice(rangeLimitTwo, rangeLimitOne + 1);
};

const getNumberWithLeadZero = (i) => (i < 10) ? `0${i}` : i;

const toggleForm = (form, activClassName, isActive) => {
  const fieldsetList = form.querySelectorAll('fieldset');
  form.classList.toggle(activClassName);
  fieldsetList.forEach((fieldset) => {
    fieldset.disabled = !isActive;
  });
};
const isEscKey = (evt) => (evt.key === 'Escape');

export {
  getRandomInteger,
  getRandomRealNumber,
  getRandomArrayElement,
  getRandomArrayPart,
  getNumberWithLeadZero,
  toggleForm,
  isEscKey
};
