import FilterView from '../view/filter.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { FILTER_TYPE, UPDATE_TYPE } from '../const.js';

export default class Filter {
  constructor(filterContainer, models) {
    this._filterContainer = filterContainer;
    this._filterModel = models.get('filterModel');
    this._routeModel = models.get('routeModel');

    this._filterComponent = null;

    this._routeModel.addObserver(this._handleModelEvent.bind(this));
    this._filterModel.addObserver(this._handleModelEvent.bind(this));
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.filter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange.bind(this));

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
    return Object.values(FILTER_TYPE);
  }

  disableFilters() {
    const filters = document.querySelectorAll('.trip-filters__filter-input');

    filters.forEach((filter) => filter.setAttribute('disabled', true));
  }

  enableFilters() {
    const filters = document.querySelectorAll('.trip-filters__filter-input');

    filters.forEach((filter) => filter.removeAttribute('disabled'));
  }
}
