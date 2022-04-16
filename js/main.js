import { getOffers } from './api.js';
import { filterFormElement, setFilterChange, isSimilarOffer } from './filter-form.js';
import { offerFormElement, setResetButtonClick } from './offer-form.js';
import { toggleForm, debounce } from './util.js';
import { createCustomPopup } from './generate-card.js';
import { initMap, layerForMarkers, createMarker, createMarkersGroup, resetMap } from './map.js';
import { AD_FORM_DISABLED_CLASS, FILTER_FORM_DISABLED_CLASS, OFFER_COUNT, RERENDER_DELAY } from './const.js';
import { resetPhoto } from './add-photo.js';

const toggleForms = (isActive) => {
  toggleForm(offerFormElement, AD_FORM_DISABLED_CLASS, isActive);
  toggleForm(filterFormElement, FILTER_FORM_DISABLED_CLASS , isActive);
};

toggleForms(false);

const loadMap = getOffers((offers) => {
  initMap(offers.slice(0, OFFER_COUNT), createCustomPopup,
    () => (offers.length) ? toggleForms(true) : toggleForm(offerFormElement, AD_FORM_DISABLED_CLASS, true));
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
      filterFormElement.reset();
      resetMap();
      layerForMarkers.clearLayers();
      createMarkersGroup(offers.slice(0, OFFER_COUNT), createCustomPopup);
      resetPhoto();
    });
});

loadMap();
