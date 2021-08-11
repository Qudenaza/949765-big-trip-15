import { v4 as uuid } from 'uuid';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getUniqueID = () => {
  const id = uuid();

  return id.split('-')[0];
};

export { getRandomInteger, getUniqueID };
