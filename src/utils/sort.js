import dayjs from 'dayjs';

export const sort = {
  day: (data) => data.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))),
  price: (data) => data.sort((a, b) => b.basePrice - a.basePrice),
  time: (routePoints) => routePoints.sort((a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom))),
};

