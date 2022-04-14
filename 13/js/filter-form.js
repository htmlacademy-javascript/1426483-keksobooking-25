import { getPriceLevel, checkEquality } from './util.js';
const filterForm = document.querySelector('.map__filters');
const filterFormFields = filterForm.querySelectorAll('select');
const housingFeatures = filterForm.querySelectorAll('[name="features"]');
const housingType = filterForm.querySelector('[name="housing-type"]');
const housingPrice = filterForm.querySelector('[name="housing-price"]');
const housingRooms = filterForm.querySelector('[name="housing-rooms"]');
const housingGuests = filterForm.querySelector('[name="housing-guests"]');

const matchFeatures = (features) => {
  if (!features) {
    return false;
  }
  const checkedElements = filterForm.querySelectorAll('[name="features"]:checked');
  const checkedValues = Array.from(checkedElements, ({ value }) => value);
  const matches = features.filter((feature) => checkedValues.includes(feature));

  return matches.length === checkedElements.length;
};

const isSimilarOffer = ({ offer }) =>
  [
    [offer.type, housingType.value],
    [getPriceLevel(offer.price), housingPrice.value],
    [offer.rooms, housingRooms.value],
    [offer.guests, housingGuests.value]
  ].every(checkEquality) && matchFeatures(offer.features);

const setFilterChange = (cb) => {
  filterFormFields.forEach((filter) => filter.addEventListener('change', () => cb()));
  housingFeatures.forEach((feature) => feature.addEventListener('change', () => cb()));
};

export { filterForm, setFilterChange, isSimilarOffer };
