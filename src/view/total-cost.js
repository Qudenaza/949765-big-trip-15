import { createElement } from '../utils.js';

const createTotalCostTemplate = (tripPoints = []) => {
  const totalCost = tripPoints.reduce((sum, current) => current.basePrice ? sum + current.basePrice : 0, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;
};

export default class TotalCost {
  constructor(tripPoints) {
    this._tripPoints = tripPoints;
    this._element = null;
  }

  getTemplate() {
    return createTotalCostTemplate(this._tripPoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
