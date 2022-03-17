import {createOffers} from './create-offers.js';
import {TYPES} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarOffers = createOffers();
// const similarListFragment = document.createDocumentFragment();
const similarElements = [];

const fillELement = (container, dataList, getChild) => {
  if (dataList.length > 0) {
    container.innerHTML = '';
    dataList.forEach((item) => {
      container.append(getChild(item));
    });
  } else {
    container.remove();
  }
};

similarOffers.forEach(({author, offer}) => {
  const template = cardTemplate.cloneNode(true);

  const contentToSelector = {
    '.popup__title': offer.title,
    '.popup__text--address': offer.address,
    '.popup__text--price': `${offer.price} ₽/ночь`,
    '.popup__type': TYPES[offer.type],
    '.popup__text--capacity': `${offer.rooms} комнаты для ${offer.guests} гостей`,
    '.popup__text--time': `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
    '.popup__description': offer.description
  };

  Object.entries(contentToSelector).forEach(([selector, content]) => {
    const element = template.querySelector(selector);
    if (content) {
      element.textContent = content;
    } else {
      element.remove();
    }
  });

  const photoContainer = template.querySelector('.popup__photos');
  const photoElement = photoContainer.querySelector('.popup__photo');

  fillELement(photoContainer, offer.photos, (photo) => {
    const newPhoto = photoElement.cloneNode(true);
    newPhoto.src = photo;
    return newPhoto;
  });

  const avatarElement = template.querySelector('.popup__avatar');
  if (author.avatar) {
    avatarElement.src = author.avatar;
  } else {
    avatarElement.remove();
  }
  // similarListFragment.append(template);
  similarElements.push(template);
});

// document.querySelector('#map-canvas').append(similarListFragment);
document.querySelector('#map-canvas').append(similarElements[6]);


