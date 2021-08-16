const routeSort = {
  day: (a, b) => {
    const firstPointStart = new Date(a.dateFrom);
    const secondPointStart = new Date(b.dateFrom);

    return firstPointStart - secondPointStart;
  },
  price: (a, b) => b.basePrice - a.basePrice,
  time: (a, b) => {
    const firstPointDuration = new Date(a.dateTo) - new Date(a.dateFrom);
    const secondPointDuration = new Date(b.dateTo) - new Date(b.dateFrom);

    return secondPointDuration - firstPointDuration;
  },
};

export const generateSort = (routePoints, condition) => routePoints.sort(routeSort[condition]);
