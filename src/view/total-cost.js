import AbstractView from './abstract.js';

const createTotalCostTemplate = (totalCost = 0) => `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
</p>`;


export default class TotalCost extends AbstractView {
  constructor(totalCost) {
    super();

    this._totalCost = totalCost;
  }

  getTemplate() {
    return createTotalCostTemplate(this._totalCost);
  }

  updateTotalCost(payload) {
    const target = this.getElement().querySelector('.trip-info__cost-value');

    target.textContent = payload;
  }
}
