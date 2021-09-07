import AbstractView from './abstract.js';

const createFilterItemTemplate = (filterName, currentFilter, disabledFilter) => `<div class="trip-filters__filter">
  <input id="filter-${filterName}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${filterName}" ${filterName === currentFilter ? 'checked' : ''} ${disabledFilter ? 'disabled' : ''}>
  <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
</div>`;

const createFilterTemplate = (filterItems, currentFilter, disabledFilter) => {
  const filterItemsTemplate = filterItems.slice().map((filter) => createFilterItemTemplate(filter, currentFilter, disabledFilter)).join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType, disabledFilter) {
    super();

    this._disabledFilter = disabledFilter;
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter, this._disabledFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    this._callback.filterTypeChange(evt.target.value);
  }

  disableFilters() {
    const filters = this.getElement().querySelectorAll('input');

    filters.forEach((filter) => {
      if (filter.disabled) {
        return;
      }

      return filter.setAttribute('disabled', true);
    });
  }

  enableFilters() {
    const filters = this.getElement().querySelectorAll('input');

    filters.forEach((filter) => {
      if (filter.disabled) {
        return;
      }

      return filter.removeAttribute('disabled');
    });
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;

    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }

  setFilterStatus(key, status) {
    if (status === 'disabled') {
      this.getElement().querySelector(`[value='${key}'`).disabled = true;

      return;
    }

    this.getElement().querySelector(`[value='${key}'`).disabled = false;
  }
}

