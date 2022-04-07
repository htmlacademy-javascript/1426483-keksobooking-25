import { getOffers } from './api.js';
import { filterForm } from './filter-form.js';
import { offerForm } from './offer-form.js';
import { toggleForm } from './util.js';
import { createCustomPopup } from './generate-card.js';
import { initMap } from './map.js';
import { AD_FORM_DISABLED_CLASS, FILTER_FORM_DISABLED_CLASS } from './data.js';

const toggleForms = (isActive) => {
  toggleForm(offerForm, AD_FORM_DISABLED_CLASS, isActive);
  toggleForm(filterForm, FILTER_FORM_DISABLED_CLASS , isActive);
};

toggleForms(false);


const loadMap = getOffers((offers) => initMap(offers, createCustomPopup, () =>
  (offers.length) ? toggleForms(true) : toggleForm(offerForm, AD_FORM_DISABLED_CLASS, true)));

loadMap();
