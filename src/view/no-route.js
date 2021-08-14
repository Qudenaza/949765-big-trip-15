import AbstractView from './abstract.js';

const NO_ROUTE_MESSAGES = {
  'everything': 'Click New Event to create your first point',
  'future': 'There are no future events now',
  'past': 'There are no past events now',
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
