import { FILTER_NAMES } from '../const.js';
import { createElement } from '../utils.js';

const createFilterItemTemplate = (filterName) => `<div class="trip-filters__filter">
  <input id="filter-${filterName}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${filterName}" ${filterName === 'everything' ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
</div>`;

const createFilterTemplate = () => {
  const filterItemsTemplate = FILTER_NAMES.slice(0).map((filterName) => createFilterItemTemplate(filterName)).join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
