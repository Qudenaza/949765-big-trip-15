import TripView from '../view/trip.js';
import TotalCostView from '../view/total-cost.js';
import { render, RenderPosition } from '../utils/render.js';
import { calculateTotalCost, calculateRouteWay, calculateRouteDates } from '../utils/common.js';

export default class Detail {
  constructor(container, models) {
    this._container = container;
    this._routeModel = models.get('routeModel');

    this._tripComponent = null;
    this._totalCostComponent = null;
  }

  init() {
    this._tripComponent = new TripView();
    this._totalCostComponent = new TotalCostView();

    this._renderTrip();
    this._renderTotalCost();

    this._routeModel.addObserver(this._handleModelEvent.bind(this));
  }

  _getRoutePoints() {
    return this._routeModel.data;
  }

  _renderTrip() {
    const container = this._container.querySelector('.trip-main__trip-info');

    render(container, this._tripComponent, RenderPosition.BEFOREEND);
  }

  _renderTotalCost() {
    const container = this._container.querySelector('.trip-main__trip-info');

    render(container, this._totalCostComponent, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    const data = this._getRoutePoints();

    this._totalCostComponent.updateTotalCost(calculateTotalCost(data));

    this._tripComponent.updateRouteDetails(calculateRouteWay(data), calculateRouteDates(data));
  }
}
