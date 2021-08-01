const tripPointsSort = {
  price: (firstTripPoint, secondTripPoint) => secondTripPoint.base_price - firstTripPoint.base_price,
  time: (firstTripPoint, secondTripPoint) => {
    const firstTripPointDuration = new Date(firstTripPoint.date_to) - new Date(firstTripPoint.date_from),
          secondTripPointDuration = new Date(secondTripPoint.date_to) - new Date(secondTripPoint.date_from);

    return secondTripPointDuration - firstTripPointDuration;
  }
}

export const generateSort = (tripPoints, cond) => tripPoints.sort(tripPointsSort[cond]);
