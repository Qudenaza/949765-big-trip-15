import AbstractObserver from '../utils/observer.js';
import { FILTER_TYPE } from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();

    this._activeFilter = FILTER_TYPE.ALL;
  }

  get filter() {
    return this._activeFilter;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;

    this._notify(updateType, filter);
  }
}
