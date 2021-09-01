import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatDate = (date, format, isUtc = true) => isUtc ? dayjs.utc(date).format(format) : dayjs(date).format(format);

export const getCorrectTime = (date) => {
  const hours = dayjs(date).utc().hour();
  const minutes = dayjs(date).utc().minute();

  return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`;
};

export const calculateDuration = (from, to, singleDate = false) => {
  const ms = singleDate ? singleDate : dayjs(to).diff(dayjs(from));

  let days = parseInt((ms / (1000 * 60 * 60 * 24)), 10);
  let hours = parseInt(((ms / (1000 * 60 * 60)) % 24), 10);
  let minutes = parseInt(((ms / (1000 * 60)) % 60), 10);

  days = days < 10 ? `0${days}D` : `${days}D`;
  hours = hours < 10 ? `0${hours}H` : `${hours}H`;
  minutes = minutes < 10 ? `0${minutes}M` : `${minutes}M`;

  if (days !== '00D') {
    return `${days} ${hours} ${minutes}`;
  } else if (hours !== '00H') {
    return `${hours} ${minutes}`;
  }

  return minutes;
};

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
