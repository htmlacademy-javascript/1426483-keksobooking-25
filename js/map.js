import { latLngMapCenter, ZOOM, PIN_RATIO, PIN_SIZE, MAIN_PIN_SIZE } from './data.js';

const getLocationString = ({ lat, lng }) => `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

const map = L.map('map-canvas');

// добавляем изображения карт
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const setPin = (size, filename) => L.icon({
  iconUrl: `./img/${filename}.svg`,
  iconSize: [size, size],
  iconAnchor: [size * PIN_RATIO, size],
});


// иконка главного маркера
const mainPinIcon = setPin(MAIN_PIN_SIZE, 'main-pin');


// главный маркер
const mainPinMarker = L.marker(
  latLngMapCenter,
  {
    icon: mainPinIcon,
    draggable: true,
  },
);
// добавляем главный маркер на карту
mainPinMarker.addTo(map);

// обычные метки
const icon = setPin(PIN_SIZE, 'pin');

// создаем слой для меток
const markerGroup = L.layerGroup().addTo(map);

// функция создания метки
const createMarker = (createTemplate) => (point) => {
  const marker = L.marker(point.location, { icon });
  marker
    .addTo(markerGroup)
    .bindPopup(createTemplate(point));
};

const addMainPinMarkerHandlers = (address) => {
  mainPinMarker.on('moveend', (evt) => {
    address.value = getLocationString(evt.target.getLatLng());
  });
};

const resetMap = () => map.setView(latLngMapCenter, ZOOM);

const initMap = (points, createTemplate, onLoadMap) => {
  points.forEach(createMarker(createTemplate));
  map.on('load', onLoadMap).setView(latLngMapCenter, ZOOM);
};

export { addMainPinMarkerHandlers, initMap, mainPinMarker, resetMap };

