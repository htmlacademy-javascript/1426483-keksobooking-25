import { MAX_PRICE } from './data.js';
const createSlider = (sliderElement, inputRelatedSlider) => {
  inputRelatedSlider.value = 5000;

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: MAX_PRICE,
    },
    start: 5000,
    step: 1,
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


// const addSliderHandlers = ( price, validate) => {
//   sliderElement.noUiSlider.on('update', () => {
//     price.value = sliderElement.noUiSlider.get();
//     validate();
//   });
// };

const updateSlider = (slider, value) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: MAX_PRICE,
    },
    step: 1,
  });
  slider.noUiSlider.set(value);
};

export {createSlider, updateSlider};
