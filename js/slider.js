import { MAX_PRICE, STEP } from './const.js';

const createSlider = (sliderElement, min, onSliderChange ) => {

  noUiSlider.create(sliderElement, {
    range: {
      min: min,
      max: MAX_PRICE,
    },
    start: min,
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

  sliderElement.noUiSlider.on('slide', onSliderChange);

  return sliderElement.noUiSlider;
};

const updateSlider = (slider, min, value) => {
  slider.updateOptions({
    range: {
      min: min,
      max: MAX_PRICE,
    },
    step: STEP,
  });
  slider.set(value);
};

export { createSlider, updateSlider };
