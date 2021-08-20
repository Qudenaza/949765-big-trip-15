import RouteView from '../view/route.js';
import NoRouteView from '../view/no-route.js';
import SortView from '../view/sort.js';
import RoutePointListView from '../view/route-point-list.js';
import RoutePointPresenter from './route-point.js';
import { render, RenderPosition, replace } from '../utils/render.js';
import { updateItem, removeItem } from '../utils/common.js';
import { generateSort } from '../mock/sort.js';

export default class Route {
  constructor(container) {
    this._routeContainer = container;
    this._routePresenter = new Map();
    this._currentSortType = 'day';

    this._routeComponent = new RouteView();
    this._noRouteComponent = new NoRouteView('everything');
    this._sortComponent = new SortView();
    this._routePointListComponent = new RoutePointListView();

    this._handleRoutePointChange = this._handleRoutePointChange.bind(this);
    this._handleRoutePointRemove = this._handleRoutePointRemove.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(routePoints) {
    this._routePoints = routePoints;

    this._sourcedRoutePoints = routePoints.slice();

    render(this._routeContainer, this._routeComponent, RenderPosition.BEFOREEND);

    generateSort(this._routePoints, this._currentSortType);

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
  }

  _renderSort() {
    render(this._routePointListComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(data) {
    const sortBy = data.split('-')[1];

    if (this._currentSortType === sortBy) {
      return;
    }

    this._sortRoutePoints(sortBy);

    this._clearRoutePointList();
    this._renderRoutePointList();
  }

  _sortRoutePoints(sortBy) {
    switch (sortBy) {
      case 'price':
        generateSort(this._routePoints, 'price');
        break;
      case 'time':
        generateSort(this._routePoints, 'time');
        break;
      case 'day':
        generateSort(this._routePoints, 'day');
        break;
      default:
        this._routePoints = this._sourcedRoutePoints.slice();
    }

    this._currentSortType = sortBy;
  }

  _renderRoutePoint(point) {
    const routePointPresenter = new RoutePointPresenter(this._routePointListComponent, this._handleRoutePointChange, this._handleRoutePointRemove, this._handleModeChange);

    routePointPresenter.init(point);

    this._routePresenter.set(point.id, routePointPresenter);
  }

  _handleRoutePointChange(updatedPoint) {
    this._routePoints = updateItem(this._routePoints, updatedPoint);

    this._routePresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _handleRoutePointRemove(removedPoint) {
    this._routePoints = removeItem(this._routePoints, removedPoint);

    this._routePresenter.get(removedPoint.id).destroy();

    this._routePresenter.delete(removedPoint.id);
  }

  _renderRoutePoints() {
    this._routePoints.forEach((point) => this._renderRoutePoint(point));
  }

  _renderRoutePointList() {
    render(this._routeComponent, this._routePointListComponent, RenderPosition.BEFOREEND);

    this._renderRoutePoints();
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
