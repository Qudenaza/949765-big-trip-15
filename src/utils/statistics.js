import dayjs from 'dayjs';

const calculateCost = (data) => {
  const costByType = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'drive': 0,
    'flight': 0,
    'check-in': 0,
    'sightseeing': 0,
    'restaurant': 0,
  };

  data.forEach((item) => costByType[item.type] += +item.basePrice);

  const dataByOrder = new Map(Object.entries(costByType).sort((a, b) => b[1] - a[1]));

  return dataByOrder;
};

const calculateType = (data) => {
  const timesByType = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'drive': 0,
    'flight': 0,
    'check-in': 0,
    'sightseeing': 0,
    'restaurant': 0,
  };

  data.forEach((item) => timesByType[item.type]++);

  const dataByOrder = new Map(Object.entries(timesByType).sort((a, b) => b[1] - a[1]));

  return dataByOrder;
};

const calculateTime = (data) => {
  const timeByType = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'drive': 0,
    'flight': 0,
    'check-in': 0,
    'sightseeing': 0,
    'restaurant': 0,
  };

  data.forEach((item) => timeByType[item.type] += dayjs(item.dateTo).diff(dayjs(item.dateFrom)));

  const dataByOrder = new Map(Object.entries(timeByType).sort((a, b) => b[1] - a[1]));

  return dataByOrder;
};


export { calculateCost, calculateType, calculateTime };
