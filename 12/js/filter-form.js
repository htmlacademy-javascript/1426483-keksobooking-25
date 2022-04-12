const filterForm = document.querySelector('.map__filters');
const filterFormFields = filterForm.querySelectorAll('select');
const housingFeatures = filterForm.querySelectorAll('[name="features"]');

// const getCondition = (filter) => {
//   if (filter.value === 'any') {
//     return true;
//   }
//   return parseInt(filter.value, 10);
// };

const getPriceLevel = (price) =>  {
  if (price <= 10000) {
    return 'low';
  } else if (price >= 50000) {
    return 'high';
  }
  return 'middle';
};

const isSimilarOffer = ({offer}) => {
  const housingType = filterForm.querySelector('[name="housing-type"]');
  const housingPrice = filterForm.querySelector('[name="housing-price"]');
  const housingRooms = filterForm.querySelector('[name="housing-rooms"]');
  const housingGuests = filterForm.querySelector('[name="housing-guests"]');
  const housingFeaturesChecked = filterForm.querySelectorAll('input[name="features"]:checked');

  const housingFeaturesCheckedValue = Array.from(housingFeaturesChecked, (el) => el.value);

  const featuresMathing = () => {
    if (offer.features) {
      const offerFeaturesMathes = offer.features.filter((feature) => housingFeaturesCheckedValue.includes(feature));

      if (offerFeaturesMathes.length === housingFeaturesChecked.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  if (
    (offer.type === housingType.value || housingType.value === 'any') &&
    (getPriceLevel(offer.price) === housingPrice.value ||  housingPrice.value === 'any')&&
    (offer.rooms === parseInt(housingRooms.value, 10) || housingRooms.value === 'any') &&
    (offer.guests === parseInt(housingGuests.value, 10) || housingGuests.value === 'any') &&
    featuresMathing()

  // // почему этот вариант не работает, значение весегда false
  // // housingType.value === (offer.type || 'any') почему этот вариант не работает, значение весегда false
  // // housingPrice.value === (getPriceLevel(offer.price) || 'any') &&
  // // getCondition(housingRooms) === (offer.rooms || true)
  // // getCondition(housingGuests) === (offer.guests || true)
  ) {
    return true;
  } else {
    return false;
  }
};

const setFilterChange = (cb) => {
  filterFormFields.forEach((filter) => filter.addEventListener('change', () => cb()));
  housingFeatures.forEach((feature) => feature.addEventListener('change', () => cb()));
};

export { filterForm, setFilterChange, isSimilarOffer };
