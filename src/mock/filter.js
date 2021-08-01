const tripPointsFilters = {
  every: (tripPoint) => {
    const { date_from, date_to } = tripPoint,
          dateNow = +new Date();

    return +new Date(date_from) < dateNow && dateNow < +new Date(date_to);
  },
  future: (tripPoint) => {
    const { date_from } = tripPoint,
          dateNow = +new Date();

    return +new Date(date_from) > dateNow;
  },
  past: (tripPoint) => {
    const { date_to } = tripPoint,
          dateNow = +new Date();

    return +new Date(date_to) < dateNow;
  }
};

export const generateFilter = (tripPoints, cond) => tripPoints.filter(tripPointsFilters[cond]);

