import { FILTER_TYPE } from '../const.js';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export const filter = {
  [FILTER_TYPE.ALL]: (routePoints) => routePoints,
  [FILTER_TYPE.PAST]: (routePoints) => routePoints.filter((point) => {
    if (dayjs().isBetween(point.dateFrom, point.dateTo)) {
      return true;
    }

    return dayjs(point.dateTo).isSameOrBefore((dayjs()));
  }),
  [FILTER_TYPE.FUTURE]: (routePoints) => routePoints.filter((point) => {
    if (dayjs().isBetween(point.dateFrom, point.dateTo)) {
      return true;
    }

    return dayjs(point.dateFrom).isSameOrAfter(dayjs());
  }),
};
