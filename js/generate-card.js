import {createOffers} from './create-offers.js';
import {TYPES} from './data.js';

const mapСanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarOffers = createOffers();
// const similarListFragment = document.createDocumentFragment();
const similarElements = [];

similarOffers.forEach(({author, offer}) => {
  const cardOffer = cardTemplate.cloneNode(true);

  cardOffer.querySelector('.popup__title').textContent = offer.title;
  cardOffer.querySelector('.popup__text--address').textContent = offer.address;
  cardOffer.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardOffer.querySelector('.popup__type').textContent = TYPES[offer.type];
  cardOffer.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardOffer.querySelector('.popup__features').textContent = offer.features;
  cardOffer.querySelector('.popup__description').textContent = offer.description;
  cardOffer.querySelector('.popup__avatar').src = author.avatar;

  const photoContainer = cardOffer.querySelector('.popup__photos');
  const photoElement = photoContainer.querySelector('.popup__photo');
  photoElement.remove();
  offer.photos.forEach((photo) => {
    const newPhoto = photoElement.cloneNode(true);
    newPhoto.src = photo;
    photoContainer.append(newPhoto);
  });

  const cardElements = cardOffer.children;
  for (const cardElement of cardElements) {
    if (cardElement.tagName === 'IMG' && !cardElement.src.includes('img')) {
      cardElement.remove();
    } else if (cardElement.tagName === 'DIV' && !cardElement.children.length) {
      cardElement.remove();
    } else if (cardElement.tagName === 'UL' && !cardElement.children.length) {
      cardElement.remove();
    } else if (cardElement.tagName !== 'IMG' && cardElement.tagName !== 'DIV' &&cardElement.tagName !== 'UL' && !cardElement.textContent) {
      cardElement.remove();
    }
  }
  // similarListFragment.appendChild(cardOffer);
  similarElements.push(cardOffer);
});

// mapСanvas.appendChild(similarListFragment);
mapСanvas.append(similarElements[6]);


