import { getOffers } from './api.js';
import { filterForm } from './filter-form.js';
import { offerForm, setResetButtonClick } from './offer-form.js';
import { toggleForm } from './util.js';
import { createCustomPopup } from './generate-card.js';
import { initMap, layerForMarkers, createMarker, createMarkersGroup, resetMap } from './map.js';
import { AD_FORM_DISABLED_CLASS, FILTER_FORM_DISABLED_CLASS, OFFER_COUNT, RERENDER_DELAY } from './data.js';
import { setFilterChange, isSimilarOffer } from './filter-form.js';
import { debounce } from './util.js';
import './add-foto.js';

const toggleForms = (isActive) => {
  toggleForm(offerForm, AD_FORM_DISABLED_CLASS, isActive);
  toggleForm(filterForm, FILTER_FORM_DISABLED_CLASS , isActive);
};

toggleForms(false);


const loadMap = getOffers((offers) => {
  initMap(offers.slice(0, OFFER_COUNT), createCustomPopup,
    () => (offers.length) ? toggleForms(true) : toggleForm(offerForm, AD_FORM_DISABLED_CLASS, true));
  setFilterChange(debounce(
    () => {
      layerForMarkers.clearLayers();
      offers
        .slice()
        .filter((offer) => isSimilarOffer(offer))
        .slice(0, OFFER_COUNT)
        .forEach(createMarker(createCustomPopup));
    },
    RERENDER_DELAY,
  )
  );
  setResetButtonClick(
    () => {
      filterForm.reset();
      resetMap();
      layerForMarkers.clearLayers();
      createMarkersGroup(offers.slice(0, OFFER_COUNT), createCustomPopup);
    });
});

loadMap();
