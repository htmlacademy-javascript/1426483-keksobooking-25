import { OFFER_COUNT, COORD_DECIMALS, OFFER_TYPES, TIMES, FEATURES, DESCRIPTIONS, TITLES, PHOTOS_LINKS, LatRange, LngRange, PriceRange, RoomsRange, GuestsRange } from './const.js';
import { getRandomInteger, getRandomRealNumber, getRandomArrayElement, getRandomArrayPart, getNumberWithLeadZero } from './util.js';

const createOffer = (i) => {
  const lat = getRandomRealNumber(LatRange.MIN, LatRange.MAX, COORD_DECIMALS);
  const lng = getRandomRealNumber(LngRange.MIN, LngRange.MAX, COORD_DECIMALS);
  const checks = [getRandomInteger(0, TIMES.length - 1), getRandomInteger(0, TIMES.length - 1)];
  return {
    author: {
      avatar: `img/avatars/user${getNumberWithLeadZero(i + 1)}.png`,
    },
    offer: {
      title: TITLES[i],
      address: `${lat}, ${lng}`,
      price: getRandomInteger(PriceRange.MIN, PriceRange.MAX),
      type: getRandomArrayElement(Object.keys(OFFER_TYPES)),
      rooms: getRandomInteger(RoomsRange.MIN, RoomsRange.MAX),
      guests: getRandomInteger(GuestsRange.MIN, GuestsRange.MAX),
      checkin: TIMES[Math.min(...checks)],
      checkout: TIMES[Math.max(...checks)],
      features: getRandomArrayElement(FEATURES),
      description: DESCRIPTIONS[i],
      photos: getRandomArrayPart(PHOTOS_LINKS),
    },
    location: {
      lat,
      lng,
    }
  };
};

function createOffers() {
  return Array.from({ length: OFFER_COUNT }, (el, i) => createOffer(i));
}

export { createOffers };
