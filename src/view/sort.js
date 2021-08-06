import { SORT_SETTINGS } from '../const.js';
import { createElement } from '../utils.js';

const createSortItem = (sortSettings) => {
  const { title, isDisabled, isChecked } = sortSettings;

  return `<div class="trip-sort__item trip-sort__item--${title}">
    <input id="sort-day" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${isDisabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${title}">${title}</label>
  </div>`;
};

const createSortTemplate = () => {
  const sortItemsTemplate = SORT_SETTINGS.slice(0).map((sortItem) => createSortItem(sortItem)).join('');

  return `<form class="trip-events__trip-sort trip-sort" action="#" method="get">${sortItemsTemplate}</form>`;
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
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
