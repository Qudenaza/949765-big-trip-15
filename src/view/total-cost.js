import AbstractView from './abstract.js';

const createTotalCostTemplate = (tripPoints = []) => {
  const totalCost = tripPoints.reduce((sum, current) => current.basePrice ? sum + current.basePrice : 0, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;
};

export default class TotalCost extends AbstractView {
  constructor(tripPoints) {
    super();

    this._tripPoints = tripPoints;
  }

  getTemplate() {
    return createTotalCostTemplate(this._tripPoints);
  }
}
