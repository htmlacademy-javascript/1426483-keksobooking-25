const OFFER_COUNT = 10;

const COORD_DECIMALS = 5;

const ROOM_TO_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const OFFER_TYPES = {
  palace: {
    type: 'Дворец',
    min: '10000'
  },
  flat: {
    type: 'Квартира',
    min: '1000'
  },
  house: {
    type: 'Дом',
    min: '5000'
  },
  bungalow: {
    type: 'Бунгало',
    min: '0',
  },
  hotel:  {
    type: 'Отель',
    min: '3000'
  }
};

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

const latLngMapCenter = {
  lat: 35.68000,
  lng: 139.75000,
};

const MAX_PRICE = 100000;
const MIN_PRICE = 0;
const STEP = 1;

const VALIDATION_PRIORITY = 1000;

const ZOOM = 12;
const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const PIN_RATIO = 0.5;

const SUCCESS_MESSAGE = 'Ваше объявление успешно размещено!';
const ERROR_MESSAGE = 'Ошибка размещения объявления';
const BUTTON_TEXT = 'Попробовать снова';

const AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
const FILTER_FORM_DISABLED_CLASS = 'map__filters--disabled';

const SERVER = 'https://25.javascript.pages.academy/keksobooking';
const RERENDER_DELAY = 500;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const LatRange = {
  MIN: 35.65,
  MAX: 35.7,
};

const LngRange = {
  MIN: 139.7,
  MAX: 139.8,
};

const PriceRange = {
  MIN: 10000,
  MAX: 50000,
};

const RoomsRange = {
  MIN: 1,
  MAX: 10,
};

const GuestsRange = {
  MIN: 1,
  MAX: 20,
};


export {
  OFFER_COUNT,
  COORD_DECIMALS,
  ROOM_TO_GUESTS,
  OFFER_TYPES,
  TIMES,
  FEATURES,
  DESCRIPTIONS,
  TITLES,
  PHOTOS_LINKS,
  latLngMapCenter,
  MAX_PRICE,
  MIN_PRICE,
  STEP,
  VALIDATION_PRIORITY,
  ZOOM,
  PIN_RATIO,
  PIN_SIZE,
  MAIN_PIN_SIZE,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  BUTTON_TEXT,
  SERVER,
  AD_FORM_DISABLED_CLASS,
  FILTER_FORM_DISABLED_CLASS,
  RERENDER_DELAY,
  FILE_TYPES,
  LatRange,
  LngRange,
  PriceRange,
  RoomsRange,
  GuestsRange
};
