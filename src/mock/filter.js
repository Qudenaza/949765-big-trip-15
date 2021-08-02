const tripPointsFilters = {
  every: (tripPoint) => {
    const { dateFrom, dateTo } = tripPoint,
      dateNow = +new Date();

    return +new Date(dateFrom) < dateNow && dateNow < +new Date(dateTo);
  },
  future: (tripPoint) => {
    const { dateFrom } = tripPoint,
      dateNow = +new Date();

    return +new Date(dateFrom) > dateNow;
  },
  past: (tripPoint) => {
    const { dateTo } = tripPoint,
      dateNow = +new Date();

    return +new Date(dateTo) < dateNow;
  },
};

export const generateFilter = (tripPoints, cond) => tripPoints.filter(tripPointsFilters[cond]);

