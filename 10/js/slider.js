import {MAX_PRICE, MIN_PRICE, STEP} from './data.js';

const createSlider = (sliderElement, start) => {

  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_PRICE,
      max: MAX_PRICE,
    },
    start: start,
    step: STEP,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  return sliderElement.noUiSlider;
};

const updateSlider = (slider, value) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: MIN_PRICE,
      max: MAX_PRICE,
    },
    step: STEP,
  });
  slider.noUiSlider.set(value);
};

export {createSlider, updateSlider};
