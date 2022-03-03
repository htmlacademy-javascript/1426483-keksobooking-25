function getRandomInteger(min, max) {
  if (min < max && min >= 0) {
    const random = min + Math.random() * (max - min + 1);
    return Math.floor(random);
  }
  return 'Переданы некорректные значения границ интервала';
}

function getRandomRealNumber(min, max, numOfDecimal) {
  if (min < max && min >= 0) {
    const random = min + Math.random() * (max - min + 10 ** -numOfDecimal);
    return Number(random.toFixed(numOfDecimal));
  }
  return 'Переданы некорректные значения границ интервала';
}

const getAvatarLink = (i) => {
  if (i < 10) {
    return `0${i}`;
  }
  return 10;
};

const OFFER_COUNT = 10;

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const TIME = [
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

const DESCRIPTIONS= [
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
const TITLE = [
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

const PHOTOS_LINK = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getPhotosArray = () => {
  const rangeLimitOne = getRandomInteger(0, 2);
  const rangeLimitTwo = getRandomInteger(0, 2);
  if (rangeLimitOne < rangeLimitTwo) {
    return PHOTOS_LINK.slice(rangeLimitOne, rangeLimitTwo + 1);
  }
  return PHOTOS_LINK.slice(rangeLimitTwo, rangeLimitOne + 1);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createOffer = (i) => {
  const propose = {
    author: {
      avatar: `img/avatars/user${getAvatarLink(i)}.png`,
    },
    offer: {
      title: TITLE[i],
      address: '',
      price: getRandomInteger(0, 100),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInteger(0, 10),
      guests: getRandomInteger(0, 10),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomArrayElement(FEATURES),
      description: DESCRIPTIONS[i],
      photos: getPhotosArray(),
    },
    location: {
      lat: getRandomRealNumber(35.65000, 35.70000, 5),
      lng: getRandomRealNumber(139.70000, 139.80000, 5),
    }
  };
  propose.offer.address = `${propose.location.lat}, ${propose.location.lng}`;
  return propose;
};
function createOffers() {
  return Array.from({ length: OFFER_COUNT }, (el, i) => createOffer(i));
}

createOffers();

