import AbstractView from './abstract.js';

const createFilterItemTemplate = (filterName, currentFilter) => `<div class="trip-filters__filter">
  <input id="filter-${filterName}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${filterName}" ${filterName === currentFilter ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
</div>`;

const createFilterTemplate = (filterItems, currentFilter) => {
  const filterItemsTemplate = filterItems.slice().map((filter) => createFilterItemTemplate(filter, currentFilter)).join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;

    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}

