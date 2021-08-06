const OFFER_TYPES = {
  'taxi': [
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
  'bus': [
    {
      title: 'Infotainment system',
      price: 50,
    },
    {
      title: 'Order meal',
      price: 100,
    },
    {
      title: 'Choose seats',
      price: 190,
    },
  ],
  'train': [
    {
      title: 'Book a taxi at the arrival point',
      price: 110,
    },
    {
      title: 'Order a breakfast',
      price: 80,
    },
    {
      title: 'Wake up at a certain time',
      price: 140,
    },
  ],
  'ship': [
    {
      title: 'Choose meal',
      price: 130,
    },
    {
      title: 'Choose seats',
      price: 160,
    },
    {
      title: 'Upgrade to comfort class',
      price: 170,
    },
    {
      title: 'Upgrade to business class',
      price: 150,
    },
    {
      title: 'Business lounge',
      price: 40,
    },
  ],
  'drive': [
    {
      title: 'Choose comfort class',
      price: 110,
    },
    {
      title: 'Choose business class',
      price: 180,
    },
  ],
  'flight': [
    {
      title: 'Choose meal',
      price: 120,
    },
    {
      title: 'Choose seats',
      price: 90,
    },
    {
      title: 'Upgrade to comfort class',
      price: 120,
    },
    {
      title: 'Upgrade to business class',
      price: 120,
    },
    {
      title: 'Add luggage',
      price: 170,
    },
  ],
  'check-in': [
    {
      title: 'Choose the time of check-in',
      price: 70,
    },
    {
      title: 'Choose the time of check-out',
      price: 190,
    },
    {
      title: 'Add breakfast',
      price: 110,
    },
    {
      title: 'Laundry',
      price: 140,
    },
    {
      title: 'Order a meal from the restaurant',
      price: 30,
    },
  ],
  'sightseeing': [],
  'restaurant': [
    {
      title: 'Choose live music',
      price: 150,
    },
    {
      title: 'Choose VIP area',
      price: 70,
    },
  ],
};
const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const FILTER_NAMES = ['everything', 'future', 'past'];
const SORT_SETTINGS = [
  {
    title: 'day',
    isDisabled: false,
    isChecked: false,
  },
  {
    title: 'event',
    isDisabled: true,
    isChecked: false,
  },
  {
    title: 'time',
    isDisabled: false,
    isChecked: false,
  },
  {
    title: 'price',
    isDisabled: false,
    isChecked: true,
  },
  {
    title: 'offers',
    isDisabled: true,
    isChecked: false,
  },
];
const BLANK_TRIP_POINT = {
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

export { OFFER_TYPES, TRIP_TYPES, FILTER_NAMES, SORT_SETTINGS, BLANK_TRIP_POINT };
