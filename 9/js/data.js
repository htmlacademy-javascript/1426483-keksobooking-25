const OFFER_COUNT = 10;

const ROOM_TO_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const MIN_PRICE = {
  palace: '10000',
  flat: '1000',
  house: '5000',
  bungalow: '0',
  hotel: '3000'
};

const TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
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

export { OFFER_COUNT, ROOM_TO_GUESTS, MIN_PRICE, TYPES, TIMES, FEATURES, DESCRIPTIONS, TITLES, PHOTOS_LINKS };
