import {LatLngMapCenter} from './data.js';

const getLocationString = ({ lat, lng }) => `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

const map = L.map('map-canvas');

// добавляем изображения карт
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// иконка главного маркера
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// главный маркер
const mainPinMarker = L.marker(
  LatLngMapCenter,
  {
    icon: mainPinIcon,
    draggable: true,
  },
);
// добавляем главный маркер на карту
mainPinMarker.addTo(map);

// обычные метки
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// создаем слой для меток
const markerGroup = L.layerGroup().addTo(map);

// функция создания метки
const createMarker = (createTemplate) => (point) => {
  const lat = point.location.lat;
  const lng = point.location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createTemplate(point));
};

const addMainPinMarkerHandlers = (adress) => {
  mainPinMarker.on('moveend', (evt) => {
    adress.value = getLocationString(evt.target.getLatLng());
  });
};

const initMap = (points, createTemplate, loadHandler) => {
  points.forEach(createMarker( createTemplate));
  map.on('load', loadHandler).setView(LatLngMapCenter, 12);
};

export { addMainPinMarkerHandlers, initMap };

// поведение при перезагрузке

// resetButton.addEventListener('click', () => {
//   mainPinMarker.setLatLng(LatLngCenter);

//   map.setView(LatLngCenter, 16);
// });
