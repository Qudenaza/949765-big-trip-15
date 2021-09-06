import { formatDate } from './utils/date';

export const BLANK_DATA = {
  basePrice: 0,
  dateFrom: formatDate(new Date()),
  dateNow: formatDate(new Date()),
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

export const SORT_TYPE = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time',
};

export const FILTER_TYPE = {
  ALL: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

export const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UPDATE_TYPE = {
  INIT: 'INIT',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const MENU_ITEM = {
  ROUTE: 'Table',
  STATS: 'Stats',
};

export const BACKGROUND_COLORS = {
  'taxi': 'rgba(252, 224, 0, 0.6)',
  'bus': 'rgba(233, 30, 99, 0.6)',
  'train': 'rgba(3, 169, 244, 0.6)',
  'ship': 'rgba(103, 58, 183, 0.6)',
  'drive': 'rgba(244, 67, 54, 0.6)',
  'flight': 'rgba(0, 150, 136, 0.6)',
  'check-in': 'rgba(96, 125, 139, 0.6)',
  'restaurant': 'rgba(205, 220, 57, 0.6)',
};

export const STORE_PREFIX = 'bigtrip-localstorage';
export const STORE_VER = 'v15';
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export const AUTHORIZATION = 'Basic s2iZ2y2b28z6';
export const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

