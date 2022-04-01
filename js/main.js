import './generate-card.js';
import {filterForm} from './filter-form.js';
import {offerForm} from './offer-form.js';
import {toggleForm} from './util.js';
import {createOffers} from './create-offers.js';
import {createCustomPopup} from './generate-card.js';
import {initMap} from './map.js';

const points = createOffers();

const toggleForms = (isActive) => {
  toggleForm(offerForm, 'ad-form--disabled', isActive);
  toggleForm(filterForm, 'map__filters--disabled', isActive);
};

toggleForms(false);

initMap(points, createCustomPopup, () => toggleForms(true));
