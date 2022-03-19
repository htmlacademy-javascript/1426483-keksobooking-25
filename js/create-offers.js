import { OFFER_COUNT, TYPES, TIMES, FEATURES, DESCRIPTIONS, TITLES, PHOTOS_LINKS } from './data.js';
import { getRandomInteger, getRandomRealNumber, getRandomArrayElement, getRandomArrayPart, getNumberWithLeadZero } from './util.js';

const createOffer = (i) => {
  const lat = getRandomRealNumber(35.65, 35.7, 5);
  const lng = getRandomRealNumber(139.7, 139.8, 5);
  const checks = [getRandomInteger(0, TIMES.length - 1), getRandomInteger(0, TIMES.length - 1)];
  return {
    author: {
      avatar: `img/avatars/user${getNumberWithLeadZero(i + 1)}.png`,
    },
    offer: {
      title: TITLES[i],
      address: `${lat}, ${lng}`,
      price: getRandomInteger(1, 100),
      type: getRandomArrayElement(Object.keys(TYPES)),
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
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

export {createOffers};
