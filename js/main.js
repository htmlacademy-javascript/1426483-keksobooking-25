function randomInteger(min, max) {
  if (min < max && min >= 0) {
    const random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  }

  return 'переданы некорректные значения границ интервала';

}

randomInteger(85, 82);

function randomRealNumber(min, max, num) {
  if (min < max && min >= 0) {
    const random = min + Math.random() * (max - min +  10 ** -num);
    return Number(random.toFixed(num));
  }
}


randomRealNumber(1.1, 1.2, 3);
