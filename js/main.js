function getRandomInteger(min, max) {
  if (min < max && min >= 0) {
    const random = min + Math.random() * (max - min + 1);
    return Math.floor(random);
  }
  return 'Переданы некорректные значения границ интервала';
}

getRandomInteger(85, 82);

function getRandomRealNumber(min, max, numOfDecimal) {
  if (min < max && min >= 0) {
    const random = min + Math.random() * (max - min + 10 ** -numOfDecimal);
    return Number(random.toFixed(numOfDecimal));
  }
  return 'Переданы некорректные значения границ интервала';
}


getRandomRealNumber(1.1, 1.2, 3);


