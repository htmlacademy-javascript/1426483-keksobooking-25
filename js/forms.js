const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');

const  deactivateFieldset = (fieldset) => {
  fieldset.disabled = true;
};

const activateFieldset = (fieldset) => {
  fieldset.disabled = false;
};

const deactivateForm = () => {
  offerForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');

  offerFormFieldsets.forEach(deactivateFieldset);

  filterFormFieldsets.forEach(deactivateFieldset);
};

const activateForm = () => {
  offerForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');

  offerFormFieldsets.forEach(activateFieldset);

  filterFormFieldsets.forEach(activateFieldset);
};

export {deactivateForm, activateForm};
