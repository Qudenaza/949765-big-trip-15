import RouteView from '../view/route.js';
import NoRouteView from '../view/no-route.js';
import SortView from '../view/sort.js';
import RoutePointListView from '../view/route-point-list.js';
import RoutePointPresenter from './route-point.js';
import { render, RenderPosition, replace } from '../utils/render.js';
import { updateItem } from '../utils/common.js';

export default class Route {
  constructor(container) {
    this._routeContainer = container;
    this._routePresenter = new Map();

    this._routeComponent = new RouteView();
    this._noRouteComponent = new NoRouteView('everything');
    this._sortComponent = new SortView();
    this._routePointListComponent = new RoutePointListView();

    this._handleRoutePointChange = this._handleRoutePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(routePoints) {
    this._routePoints = routePoints;

    render(this._routeContainer, this._routeComponent, RenderPosition.BEFOREEND);

    this._renderRoute();
  }

  _handleModeChange() {
    this._routePresenter.forEach((presenter) => presenter.resetView());
  }

  _renderRoute() {
    this._renderRoutePointList();

    if (!this._routePoints.length) {
      this._renderNoPoint();

      return;
    }

    this._renderSort();
    this._renderRoutePoints();
  }

  _renderSort() {
    render(this._routePointListComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderRoutePoint(point) {
    const routePointPresenter = new RoutePointPresenter(this._routePointListComponent, this._handleRoutePointChange, this._handleModeChange);

    routePointPresenter.init(point);

    this._routePresenter.set(point.id, routePointPresenter);
  }

  _handleRoutePointChange(updatedPoint) {
    this._routePoints = updateItem(this._routePoints, updatedPoint);

    this._routePresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderRoutePoints() {
    this._routePoints.forEach((point) => this._renderRoutePoint(point));
  }

  _renderRoutePointList() {
    render(this._routeComponent, this._routePointListComponent, RenderPosition.BEFOREEND);
  }

  _clearRoutePointList() {
    this._routePresenter.forEach((presenter) => presenter.destroy());

    this._routePresenter.clear();
  }

  _renderNoPoint() {
    const chosenFilter = document.querySelector('.trip-filters input[checked]').value;

    this._noRouteComponent.message = chosenFilter;

    replace(this._noRouteComponent, this._routePointListComponent);
  }
}
