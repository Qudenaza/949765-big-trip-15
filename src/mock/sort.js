const tripPointsSort = {
  price: (firstTripPoint, secondTripPoint) => secondTripPoint.basePrice - firstTripPoint.basePrice,
  time: (firstTripPoint, secondTripPoint) => {
    const firstTripPointDuration = new Date(firstTripPoint.dateTo) - new Date(firstTripPoint.dateFrom),
      secondTripPointDuration = new Date(secondTripPoint.dateTo) - new Date(secondTripPoint.dateFrom);

    return secondTripPointDuration - firstTripPointDuration;
  },
};

export const generateSort = (tripPoints, cond) => tripPoints.sort(tripPointsSort[cond]);
