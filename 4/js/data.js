import {getRandomInteger, getRandomRealNumber, getRandomArrayElement, getRandomArrayPart, getNumberWithLeadZero} from './util.js';

const OFFER_COUNT = 10;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'under 5 min walk to Falls',
  'Backyard Oasis-Pool',
  'views of wine country',
  'warm and comfy',
  '2 bedroom plus hot tub',
  '3 bedroom with free parking',
  'short walk to the Falls',
  'terrace, open kitchen with island',
  'air conditioning, very bright',
  'exceptional location perfect for spending the winter'
];

const TITLES = [
  'Guest suite',
  'Clean and stylish loft',
  'Chic 3 bedroom home',
  'Newly renovated cottage',
  'Cheerful bungalow',
  'Luxury stay on the River',
  'Remodeled studio',
  'The wanderlust room',
  'Farmhouse loft',
  'Modern apartment'
];

const PHOTOS_LINKS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

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
      type: getRandomArrayElement(TYPES),
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
