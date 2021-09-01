import { FILTER_TYPE } from '../const.js';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const filter = {
  [FILTER_TYPE.ALL]: (routePoints) => routePoints,
  [FILTER_TYPE.PAST]: (routePoints) => routePoints.filter((point) => dayjs(point.dateTo).isSameOrBefore((dayjs()))),
  [FILTER_TYPE.FUTURE]: (routePoints) => routePoints.filter((point) => dayjs(point.dateFrom).isSameOrAfter(dayjs())),
};
