import { createPopup } from './popup.js';
import { SUCCESS_MESSAGE, ERROR_MESSAGE, BUTTON_TEXT, SERVER } from './data.js';

const getOffers = (onSuccess) => () => {
  fetch(
    `${SERVER}/data`,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      createPopup(false, 'данные не загрузились', 'Добавить объявление');
      return [];
    })
    .then((offers) => onSuccess(offers));
};

const postOffer = (offer, onSuccess, onFail) => {
  fetch(
    SERVER,
    {
      method: 'POST',
      credentials: 'same-origin',
      body: offer,
    },
  )
    .then((response) => {
      if (response.ok) {
        createPopup(true, SUCCESS_MESSAGE);
        onSuccess();
      } else {
        createPopup(false, ERROR_MESSAGE, BUTTON_TEXT);
        onFail();
      }
    });
};

export { getOffers, postOffer };
