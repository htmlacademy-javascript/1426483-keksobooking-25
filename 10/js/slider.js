
const createSlider = (sliderElement, inputRelatedSlider) => {
  inputRelatedSlider.value = 5000;

  const slider = noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100001,
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

  // slider.on('update', () => {
  //   inputRelatedSlider.value = slider.get();
  //   validate();
  // });

  return slider;
};


// const addSliderHandlers = (slider, price, validate) => {
//   slider.on('update', () => {
//     price.value = slider.get();
//     validate();
//   });
// };

const updateSlider = (slider, value) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100001,
    },
    step: 1,
  });
  slider.noUiSlider.set(value);
};

export {createSlider, updateSlider};
