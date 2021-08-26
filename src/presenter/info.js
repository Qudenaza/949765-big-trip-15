import DetailView from '../view/detail.js';
import TotalCostView from '../view/total-cost.js';
import { render, RenderPosition } from '../utils/render.js';

export default class Info {
  constructor(container) {
    this._container = container;
  }

  init(routePoints) {
    this._routePoints = routePoints;

    this._detailComponent = new DetailView();
    this._totalCostComponent = new TotalCostView(this._routePoints);

    this._renderDetail();
    this._renderTotalCost();
  }

  _renderDetail() {
    const container = this._container.querySelector('.trip-main__trip-info');

    render(container, this._detailComponent, RenderPosition.BEFOREEND);
  }

  _renderTotalCost() {
    const container = this._container.querySelector('.trip-main__trip-info');

    render(container, this._totalCostComponent, RenderPosition.BEFOREEND);
  }
}
