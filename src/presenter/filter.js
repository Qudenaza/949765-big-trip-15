import FilterView from '../view/filter.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { filterType, UPDATE_TYPE } from '../const.js';

export default class Filter {
  constructor(filterContainer, filterModel, routeModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._routeModel = routeModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._routeModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.filter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);

      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filter) {
    if (this._filterModel.filter === filter) {
      return;
    }

    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, filter);
  }

  _getFilters() {
    return Object.values(filterType);
  }
}

