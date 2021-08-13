import AbstractView from './abstract.js';

const createTotalCostTemplate = (routePoints = []) => {
  const totalCost = routePoints.reduce((sum, current) => current.basePrice ? sum + current.basePrice : 0, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;
};

export default class TotalCost extends AbstractView {
  constructor(routePoints) {
    super();

    this._routePoints = routePoints;
  }

  getTemplate() {
    return createTotalCostTemplate(this._routePoints);
  }
}
