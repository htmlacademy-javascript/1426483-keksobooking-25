const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');

const deactivationForm = () => {
  offerForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');

  offerFormFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });

  filterFormFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });
};

const activationForm = () => {
  offerForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');

  offerFormFieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });

  filterFormFieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

export {deactivationForm, activationForm};
