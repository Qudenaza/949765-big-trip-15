import AbstractView from './abstract.js';

const FILTER_NAMES = ['everything', 'future', 'past'];

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

export default class Filter extends AbstractView {
  getTemplate() {
    return createFilterTemplate();
  }
}
