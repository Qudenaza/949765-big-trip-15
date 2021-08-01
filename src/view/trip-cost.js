export const createTripCostTemplate = (tripPoints = []) => {
  const finalCost = tripPoints.reduce((sum, current) => {
    return current.base_price ? sum + current.base_price : 0;
  }, 0);

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${finalCost}</span>
          </p>`
};
