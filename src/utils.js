import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const calculateDuration = (from, to) => {
  const ms = dayjs(to).diff(dayjs(from));

  let minutes = parseInt((ms / (1000 * 60)) % 60),
      hours = parseInt((ms / (1000 * 60 * 60)) % 24),
      days = parseInt(ms / (1000 * 60 * 60 * 24));

  days = (days < 10) ? '0' + days : days;
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  return `${days === '00' ? '' : days + 'D'} ${hours === '00' ? '00H' : hours + 'H'} ${minutes === '00' ? '00M' : minutes + 'M'}`
}

const humanizeDates = () => {
  dayjs.extend(utc);

  const date_from = dayjs.utc().add(getRandomInteger(1, 100), 'days').format();
  const date_to = dayjs.utc(date_from).add(getRandomInteger(0, 20), 'days').add(getRandomInteger(2, 24), 'hours').add(getRandomInteger(1, 60), 'minutes').format();

  return [date_from, date_to];
};

const formatDate = (date, format) => {
  return dayjs(date).format(format);
}

const isEmptyObject = (obj) => {
  for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
          return false;
      }
  }
  return true;
}

export { getRandomInteger, formatDate, calculateDuration, humanizeDates, isEmptyObject }
