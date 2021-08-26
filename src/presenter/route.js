import RouteView from '../view/route.js';
import NoRouteView from '../view/no-route.js';
import SortView from '../view/sort.js';
import RoutePointListView from '../view/route-point-list.js';
import RoutePointPresenter from './route-point.js';
import RoutePointNewPresenter from './route-point-new';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { filter } from '../utils/filter.js';
import { sort } from '../utils/sort.js';
import { sortType, USER_ACTION, UPDATE_TYPE } from '../const.js';

export default class Route {
  constructor(container, routeModel, filterModel) {
    this._routeModel = routeModel;
    this._filterModel = filterModel;
    this._routeContainer = container;
    this._routePresenter = new Map();
    this._currentSortType = sortType.DAY;
    this._filteredPoints = [];

    this._sortComponent = null;
    this._routeComponent = new RouteView();
    this._noRouteComponent = new NoRouteView('everything');
    this._routePointListComponent = new RoutePointListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._routePointNewPresenter = new RoutePointNewPresenter(this._routePointListComponent, this._handleViewAction);
  }

  init() {
    render(this._routeContainer, this._routeComponent, RenderPosition.BEFOREEND);

    this._routeModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderRoute();
  }

  createRoutePoint() {
    this._routePointNewPresenter.init();
  }

  _getRoutePoints() {
    const filterKey = this._filterModel.filter;
    const routePoints = this._routeModel.routePoints;

    this._filteredPoints = filter[filterKey](routePoints);

    switch (this._currentSortType) {
      case sortType.DAY:
        return sort[sortType.DAY](this._filteredPoints);
      case sortType.PRICE:
        return sort[sortType.PRICE](this._filteredPoints);
      case sortType.TIME:
        return sort[sortType.TIME](this._filteredPoints);
    }

    return this._filteredPoints;
  }

  _handleModeChange() {
    this._routePointNewPresenter.destroy();

    this._routePresenter.forEach((presenter) => presenter.resetView());
  }

  _renderRoute() {
    this._renderRoutePointList();

    if (!this._filteredPoints.length) {
      this._renderNoPoint();

      return;
    }

    this._renderSort();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView();

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._routePointListComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _handleSortTypeChange(data) {
    const sortBy = data.split('-')[1];

    if (this._currentSortType === sortBy) {
      return;
    }

    this._currentSortType = sortBy;

    this._clearRoutePointList();

    this._renderRoutePointList();
  }

  _renderRoutePoint(point) {
    const routePointPresenter = new RoutePointPresenter(this._routePointListComponent, this._handleViewAction, this._handleModeChange);

    routePointPresenter.init(point);

    this._routePresenter.set(point.id, routePointPresenter);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this._routeModel.updatePoint(updateType, update);
        break;
      case USER_ACTION.ADD_POINT:
        this._routeModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this._routeModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this._routePresenter.get(update.id).init(update);
        break;
      case UPDATE_TYPE.MINOR:
        this._clearRoute();
        this._renderRoute();
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearRoute({resetSortType: true});
        this._renderRoute();
        break;
    }
  }

  _renderRoutePoints(routePoints) {
    routePoints.forEach((point) => this._renderRoutePoint(point));
  }

  _renderRoutePointList() {
    const routePoints = this._getRoutePoints().slice();

    render(this._routeComponent, this._routePointListComponent, RenderPosition.BEFOREEND);

    this._renderRoutePoints(routePoints);
  }

  _clearRoutePointList() {
    this._routePresenter.forEach((presenter) => presenter.destroy());

    this._routePresenter.clear();
  }

  _clearRoute() {
    this._clearRoutePointList();

    this._routePointNewPresenter.destroy();

    remove(this._sortComponent);
    remove(this._noRouteComponent);
    remove(this._routePointListComponent);

    this._currentSortType = sortType.DAY;
  }

  _renderNoPoint() {
    this._noRouteComponent.message = this._filterModel.filter;

    replace(this._noRouteComponent, this._routePointListComponent);
  }

  destroy() {
    this._clearRoute();

    remove(this._routeComponent);

    this._routeModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }
}
