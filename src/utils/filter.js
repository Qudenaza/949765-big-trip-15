import { filterType } from '../const.js';

export const filter = {
  [filterType.ALL]: (routePoints) => routePoints.filter((point) => {
    const { dateFrom, dateTo } = point;
    const dateNow = +new Date();

    return +new Date(dateFrom) < dateNow || dateNow < +new Date(dateTo);
  }),
  [filterType.PAST]: (routePoints) => routePoints.filter((point) => {
    const { dateTo } = point;
    const dateNow = +new Date();

    return +new Date(dateTo) < dateNow;
  }),
  [filterType.FUTURE]: (routePoints) => routePoints.filter((point) => {
    const { dateFrom } = point;
    const dateNow = +new Date();

    return +new Date(dateFrom) > dateNow;
  }),
};
