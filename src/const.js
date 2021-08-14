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
      title: 'Upgrade to a business class',
      price: 190,
    },
    {
      title: 'Choose the radio station',
      price: 30,
    },
    {
      title: 'Choose temperature',
      price: 170,
    },
    {
      title: 'Drive quickly, I\'m in a hurry',
      price: 100,
    },
    {
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
  isBlank: true,
};

export { OFFER_TYPES, EVENT_TYPES, BLANK_ROUTE_POINT };
