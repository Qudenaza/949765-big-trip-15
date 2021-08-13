import { humanizeDates } from '../utils/date.js';
import { getRandomInteger } from '../utils/common.js';
import { OFFER_TYPES, EVENT_TYPES } from '../const.js';

const generateType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);

  return EVENT_TYPES[randomIndex];
};

const generateCity = () => {
  const cities = [
    'Geneva',
    'Chamonix',
    'Rome',
    'Athens',
    'Alexandria',
    'Cairo',
    'New York',
    'Moscow',
    'London',
    'Tokyo',
    'Bejing',
    'Berlin',
    'Hamburg',
    'Warsaw',
    'Los Angeles',
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generateDates = () => humanizeDates();

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
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

export { generateRoutePoint };


