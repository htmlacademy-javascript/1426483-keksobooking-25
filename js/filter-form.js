import { getPriceLevel, checkEquality } from './util.js';
const filterFormElement = document.querySelector('.map__filters');
const filterFieldElements = filterFormElement.querySelectorAll('select');
const housingFeatureElements = filterFormElement.querySelectorAll('[name="features"]');
const housingTypeElement = filterFormElement.querySelector('[name="housing-type"]');
const housingPriceElement = filterFormElement.querySelector('[name="housing-price"]');
const housingRoomsElement = filterFormElement.querySelector('[name="housing-rooms"]');
const housingGuestsElement = filterFormElement.querySelector('[name="housing-guests"]');

const matchFeatures = (features) => {
  if (!features) {
    return false;
  }
  const checkedElements = filterFormElement.querySelectorAll('[name="features"]:checked');
  const checkedValues = Array.from(checkedElements, ({ value }) => value);
  const matches = features.filter((feature) => checkedValues.includes(feature));

  return matches.length === checkedElements.length;
};

const isSimilarOffer = ({ offer }) =>
  [
    [offer.type, housingTypeElement.value],
    [getPriceLevel(offer.price), housingPriceElement.value],
    [offer.rooms, housingRoomsElement.value],
    [offer.guests, housingGuestsElement.value]
  ].every(checkEquality) && matchFeatures(offer.features);

const setFilterChange = (cb) => {
  filterFieldElements.forEach((filter) => filter.addEventListener('change', () => cb()));
  housingFeatureElements.forEach((feature) => feature.addEventListener('change', () => cb()));
};

export { filterFormElement, setFilterChange, isSimilarOffer };
