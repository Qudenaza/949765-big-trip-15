export const sort = {
  day: (routePoints) => routePoints.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)),
  price: (routePoints) => routePoints.sort((a, b) => b.basePrice - a.basePrice),
  time: (routePoints) => routePoints.sort((a, b) => {
    const firstPointDuration = new Date(a.dateTo) - new Date(a.dateFrom);
    const secondPointDuration = new Date(b.dateTo) - new Date(b.dateFrom);

    return secondPointDuration - firstPointDuration;
  }),
};

