import { getUniqueID } from './utils/common.js';

const OFFER_TYPES = {
  'taxi': [
    {
      id: getUniqueID(),
      title: 'Upgrade to a business class',
      price: 190,
    },
    {
      id: getUniqueID(),
      title: 'Choose the radio station',
      price: 30,
    },
    {
      id: getUniqueID(),
      title: 'Choose temperature',
      price: 170,
    },
    {
      id: getUniqueID(),
      title: 'Drive quickly, I\'m in a hurry',
      price: 100,
    },
    {
      id: getUniqueID(),
      title: 'Drive slowly',
      price: 110,
    },
  ],
  'bus': [
    {
      id: getUniqueID(),
      title: 'Infotainment system',
      price: 50,
    },
    {
      id: getUniqueID(),
      title: 'Order meal',
      price: 100,
    },
    {
      id: getUniqueID(),
      title: 'Choose seats',
      price: 190,
    },
  ],
  'train': [
    {
      id: getUniqueID(),
      title: 'Book a taxi at the arrival point',
      price: 110,
    },
    {
      id: getUniqueID(),
      title: 'Order a breakfast',
      price: 80,
    },
    {
      id: getUniqueID(),
      title: 'Wake up at a certain time',
      price: 140,
    },
  ],
  'ship': [
    {
      id: getUniqueID(),
      title: 'Choose meal',
      price: 130,
    },
    {
      id: getUniqueID(),
      title: 'Choose seats',
      price: 160,
    },
    {
      id: getUniqueID(),
      title: 'Upgrade to comfort class',
      price: 170,
    },
    {
      id: getUniqueID(),
      title: 'Upgrade to business class',
      price: 150,
    },
    {
      id: getUniqueID(),
      title: 'Business lounge',
      price: 40,
    },
  ],
  'drive': [
    {
      id: getUniqueID(),
      title: 'Choose comfort class',
      price: 110,
    },
    {
      id: getUniqueID(),
      title: 'Choose business class',
      price: 180,
    },
  ],
  'flight': [
    {
      id: getUniqueID(),
      title: 'Choose meal',
      price: 120,
    },
    {
      id: getUniqueID(),
      title: 'Choose seats',
      price: 90,
    },
    {
      id: getUniqueID(),
      title: 'Upgrade to comfort class',
      price: 120,
    },
    {
      id: getUniqueID(),
      title: 'Upgrade to business class',
      price: 120,
    },
    {
      id: getUniqueID(),
      title: 'Add luggage',
      price: 170,
    },
  ],
  'check-in': [
    {
      id: getUniqueID(),
      title: 'Choose the time of check-in',
      price: 70,
    },
    {
      id: getUniqueID(),
      title: 'Choose the time of check-out',
      price: 190,
    },
    {
      id: getUniqueID(),
      title: 'Add breakfast',
      price: 110,
    },
    {
      id: getUniqueID(),
      title: 'Laundry',
      price: 140,
    },
    {
      id: getUniqueID(),
      title: 'Order a meal from the restaurant',
      price: 30,
    },
  ],
  'sightseeing': [],
  'restaurant': [
    {
      id: getUniqueID(),
      title: 'Choose live music',
      price: 150,
    },
    {
      id: getUniqueID(),
      title: 'Choose VIP area',
      price: 70,
    },
  ],
};
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const BLANK_ROUTE_POINT = {
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  type: 'taxi',
  offers: [
    {
      id: getUniqueID(),
      title: 'Upgrade to a business class',
      price: 190,
    },
    {
      id: getUniqueID(),
      title: 'Choose the radio station',
      price: 30,
    },
    {
      id: getUniqueID(),
      title: 'Choose temperature',
      price: 170,
    },
    {
      id: getUniqueID(),
      title: 'Drive quickly, I\'m in a hurry',
      price: 100,
    },
    {
      id: getUniqueID(),
      title: 'Drive slowly',
      price: 110,
    },
  ],
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  isFavorite: false,
};

const CITIES = [
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

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

const sortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time',
};

const filterType = {
  ALL: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

const MENU_ITEM = {
  ROUTE: 'Table',
  STATS: 'Stats',
};

const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const BACKGROUND_COLORS = {
  'taxi': 'rgba(252, 224, 0, 0.6)',
  'bus': 'rgba(233, 30, 99, 0.6)',
  'train': 'rgba(3, 169, 244, 0.6)',
  'ship': 'rgba(103, 58, 183, 0.6)',
  'drive': 'rgba(244, 67, 54, 0.6)',
  'flight': 'rgba(0, 150, 136, 0.6)',
  'check-in': 'rgba(96, 125, 139, 0.6)',
  'restaurant': 'rgba(205, 220, 57, 0.6)',
};

export { OFFER_TYPES, EVENT_TYPES, BLANK_ROUTE_POINT, CITIES, DESCRIPTIONS, sortType, filterType, MENU_ITEM, USER_ACTION, UPDATE_TYPE, BACKGROUND_COLORS };
