import './generate-card.js';
// import './forms.js';
import './map.js';
import {deactivateForms, activateForms} from './forms.js';
import {createOffers} from './create-offers.js';
import {createCustomPopup} from './generate-card.js';
import { initMap } from './map.js';

const points = createOffers();

deactivateForms();

initMap(points, createCustomPopup, activateForms);
