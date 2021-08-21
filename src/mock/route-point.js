import { humanizeDates } from '../utils/date.js';
import { getRandomInteger } from '../utils/common.js';
import { OFFER_TYPES, EVENT_TYPES, CITIES, DESCRIPTIONS } from '../const.js';

const generateType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);

  return EVENT_TYPES[randomIndex];
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);

  return CITIES[randomIndex];
};

const generateDates = () => humanizeDates();

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);

  return DESCRIPTIONS[randomIndex];
};

const generatePictures = () => (new Array(getRandomInteger(1, 5)).fill().map(() => ({
  'src': `http://picsum.photos/248/152?r=${getRandomInteger(0, 150)}`,
  'description': 'Beautiful place in beautiful city',
})));

const generateRoutePoint = () => {
  const destination = {
    description: generateDescription(),
    name: generateCity(),
    pictures: generatePictures(),
  };

  const type = generateType();
  const dates = generateDates();

  return {
    basePrice: getRandomInteger(100, 1000),
    dateFrom: dates[0],
    dateTo: dates[1],
    destination,
    id: `${getRandomInteger(0, 1000)}`,
    isFavorite: !!getRandomInteger(0, 1),
    offers: OFFER_TYPES[type],
    type,
  };
};

export { generateRoutePoint, generateDescription, generatePictures };


