import FilterView from '../view/filter.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { FILTER_TYPE, UPDATE_TYPE } from '../const.js';
import { filter } from '../utils/filter.js';

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

    this._handleFilterStatus();
  }

  _handleFilterTypeChange(selectedFilter) {
    if (this._filterModel.filter === selectedFilter) {
      return;
    }

    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, selectedFilter);
  }

  _getFilters() {
    return Object.values(FILTER_TYPE);
  }

  disableFilters() {
    this._filterComponent.disableFilters();
  }

  enableFilters() {
    this._filterComponent.enableFilters();
  }

  _handleFilterStatus() {
    const data = this._routeModel.data;


    for (const key in filter) {
      if (!filter[key](data).length) {
        this._filterComponent.setFilterStatus(key, 'disabled');

        continue;
      }

      this._filterComponent.setFilterStatus(key, 'enabled');
    }
  }
}
