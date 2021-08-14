const routeSort = {
  price: (firstRoutePoint, secondRoutePoint) => secondRoutePoint.basePrice - firstRoutePoint.basePrice,
  time: (firstRoutePoint, secondRoutePoint) => {
    const firstRoutePointDuration = new Date(firstRoutePoint.dateTo) - new Date(firstRoutePoint.dateFrom),
      secondRoutePointDuration = new Date(secondRoutePoint.dateTo) - new Date(secondRoutePoint.dateFrom);

    return secondRoutePointDuration - firstRoutePointDuration;
  },
};

export const generateSort = (routePoints, cond) => routePoints.sort(routeSort[cond]);
