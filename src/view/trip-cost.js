export const createTripCostTemplate = (tripPoints = []) => {
  const finalCost = tripPoints.reduce((sum, current) => current.basePrice ? sum + current.basePrice : 0, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${finalCost}</span>
  </p>`;
};
