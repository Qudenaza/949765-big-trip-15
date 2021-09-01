import AbstractView from './abstract.js';
import { FILTER_TYPE } from '../const.js';

const NO_ROUTE_MESSAGES = {
  [FILTER_TYPE.ALL]: 'Click New Event to create your first point',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
  [FILTER_TYPE.PAST]: 'There are no past events now',
};

const createNoRouteTemplate = (message) => `<p class="trip-events__msg">${NO_ROUTE_MESSAGES[message]}</p>`;

export default class NoRoute extends AbstractView {
  constructor(message) {
    super();

    this._message = message;
  }

  getTemplate() {
    return createNoRouteTemplate(this._message);
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
  }
}
