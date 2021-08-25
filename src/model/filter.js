import AbstractObserver from '../utils/observer.js';
import { filterType } from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();

    this._activeFilter = filterType.ALL;
  }

  get filter() {
    return this._activeFilter;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;

    this._notify(updateType, filter);
  }
}
