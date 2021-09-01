import RoutePointPresenter from './route-point.js';
import RoutePointNewPresenter from './route-point-new.js';
import RoutePointListView from '../view/route-point-list.js';
import LoadingView from '../view/loading.js';
import NoRouteView from '../view/no-route.js';
import SortView from '../view/sort.js';
import NewButtonView from '../view/new-button.js';
import { sort } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import { render, RenderPosition, remove, replace } from '../utils/render.js';
import { USER_ACTION, UPDATE_TYPE, SORT_TYPE } from '../const.js';
import { handlePseudo } from '../utils/common.js';

export default class RouteBoard {
  constructor(container, models, api) {
    this._container = container;
    this._currentSortType = SORT_TYPE.DAY;
    this._filteredPoints = [];

    this._routeModel = models.get('routeModel');
    this._filterModel = models.get('filterModel');
    this._mockModel = models.get('mockModel');

    this._api = api;

    this._routePointListComponent = new RoutePointListView();
    this._loadingComponent = new LoadingView();
    this._noRouteComponent = new NoRouteView();
    this._newButtonComponent = new NewButtonView();
    this._sortComponent = null;

    this._routePointPresenter = new Map();
    this._routePointNewPresenter = new RoutePointNewPresenter(this._routePointListComponent, this._noRouteComponent, this._newButtonComponent, this._handleViewAction.bind(this), this._mockModel, this._filterModel);

    this._isLoading = true;

    this._renderNewButton();

    this._newButtonComponent.setClickHandler(this._handleNewButtonClick.bind(this));
  }

  init(isTabChange = false) {
    if (isTabChange) {
      this._newButtonComponent.enable();
      handlePseudo();
    }

    if (this._isLoading) {
      this._renderLoading();
      this._newButtonComponent.disable();
    }

    this._routeModel.addObserver(this._handleModelEvent.bind(this));
    this._filterModel.addObserver(this._handleModelEvent.bind(this));
  }

  createRoutePoint() {
    const noRoute = document.querySelector('.trip-events__msg');

    if (noRoute) {
      replace(this._routePointListComponent, this._noRouteComponent);

      this._routePointNewPresenter.init();

      return;
    }

    this._routePointNewPresenter.init();
  }

  destroy(isTabChange = false) {
    if (isTabChange) {
      this._newButtonComponent.disable();
      handlePseudo(true);
    }

    this._clearRouteBoard();

    this._routeModel.removeObserver(this._handleModelEvent.bind(this));
    this._filterModel.removeObserver(this._handleModelEvent.bind(this));

    this._isLoading = false;
  }

  _getRoutePointsData() {
    const filterKey = this._filterModel.filter;
    const routePoints = this._routeModel.data;

    this._filteredPoints = filter[filterKey](routePoints);

    switch (this._currentSortType) {
      case SORT_TYPE.DAY:
        return sort[SORT_TYPE.DAY](this._filteredPoints);
      case SORT_TYPE.PRICE:
        return sort[SORT_TYPE.PRICE](this._filteredPoints);
      case SORT_TYPE.TIME:
        return sort[SORT_TYPE.TIME](this._filteredPoints);
    }

    return this._filteredPoints;
  }

  _renderRouteBoard() {
    if (this._isLoading) {
      this._renderLoading();

      return;
    }

    this._renderRoutePoints();

    if (!this._filteredPoints.length) {
      this._renderNoRoute();

      return;
    }

    this._renderSort();
  }

  _clearRouteBoard() {
    this._clearRoutePoints();

    this._routePointNewPresenter.destroy();

    remove(this._sortComponent);
    remove(this._noRouteComponent);
    remove(this._loadingComponent);
    remove(this._routePointListComponent);

    this._currentSortType = SORT_TYPE.DAY;
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView();

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange.bind(this));

    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderRoutePointsList() {
    this._container.append(this._routePointListComponent.getElement());
  }

  _renderRoutePoints() {
    const points = this._getRoutePointsData().slice();

    this._renderRoutePointsList();

    points.forEach((data) => this._createRoutePoint(data));
  }

  _clearRoutePoints() {
    this._routePointPresenter.forEach((presenter) => presenter.destroy());

    this._routePointPresenter.clear();
  }

  _createRoutePoint(data) {
    const routePointPresenter = new RoutePointPresenter(this._routePointListComponent, this._handleViewAction.bind(this), this._handleModeChange.bind(this), this._mockModel);

    routePointPresenter.init(data);

    this._routePointPresenter.set(data.id, routePointPresenter);
  }

  _renderLoading() {
    render(this._container, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNewButton() {
    const newButtonContainer = document.querySelector('.trip-main');

    render(newButtonContainer, this._newButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderNoRoute() {
    remove(this._sortComponent);

    this._noRouteComponent.message = this._filterModel.filter;

    replace(this._noRouteComponent, this._routePointListComponent);
  }

  _handleModeChange() {
    this._routePointNewPresenter.destroy();

    this._routePointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UPDATE_TYPE.MINOR:
        this._routePointPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearRouteBoard();
        this._renderRouteBoard();
        break;
      case UPDATE_TYPE.INIT:
        this._isLoading = false;
        this._newButtonComponent.enable();
        remove(this._loadingComponent);
        this._renderRouteBoard();
        break;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this._api.updatePoint(update).then((response) => {
          this._routeModel.updatePoint(updateType, response);
        });
        break;
      case USER_ACTION.ADD_POINT:
        this._routeModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this._routeModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleSortTypeChange(data) {
    const sortBy = data.split('-')[1];

    if (this._currentSortType === sortBy) {
      return;
    }

    this._currentSortType = sortBy;

    this._clearRoutePoints();

    this._renderRoutePoints();
  }

  _handleNewButtonClick() {
    this.createRoutePoint();
  }
}
