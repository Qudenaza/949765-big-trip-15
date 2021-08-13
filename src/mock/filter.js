const routeFilters = {
  everything: (routePoint) => {
    const { dateFrom, dateTo } = routePoint,
      dateNow = +new Date();

    return +new Date(dateFrom) < dateNow && dateNow < +new Date(dateTo);
  },
  future: (routePoint) => {
    const { dateFrom } = routePoint,
      dateNow = +new Date();

    return +new Date(dateFrom) > dateNow;
  },
  past: (routePoint) => {
    const { dateTo } = routePoint,
      dateNow = +new Date();

    return +new Date(dateTo) < dateNow;
  },
};

export const generateFilter = (routePoints, condition) => routePoints.filter(routeFilters[condition]);

