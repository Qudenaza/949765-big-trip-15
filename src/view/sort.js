import AbstractView from './abstract.js';

const SORT_SETTING = [
  {
    title: 'day',
    isDisabled: false,
  },
  {
    title: 'event',
    isDisabled: true,
  },
  {
    title: 'time',
    isDisabled: false,
  },
  {
    title: 'price',
    isDisabled: false,
  },
  {
    title: 'offers',
    isDisabled: true,
  },
];

const createSortItem = (sortSettings, currentSortType) => {
  const { title, isDisabled } = sortSettings;

  return `<div class="trip-sort__item trip-sort__item--${title}">
    <input id="sort-${title}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${isDisabled ? 'disabled' : ''} ${currentSortType === title ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${title}">${title}</label>
  </div>`;
};

const createSortTemplate = (currentSortType) => {

  const sortItemsTemplate = SORT_SETTING.slice(0).map((sortItem) => createSortItem(sortItem, currentSortType)).join('');

  return `<form class="trip-events__trip-sort trip-sort" action="#" method="get">${sortItemsTemplate}</form>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    this._callback.sortTypeChange(evt.target.value);
  }

  setSortTypeChangeHandler(callback) {
    const target = this.getElement();

    this._callback.sortTypeChange = callback;

    target.addEventListener('change', this._sortTypeChangeHandler.bind(this));
  }
}
