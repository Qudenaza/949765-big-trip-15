import { createElement } from '../utils.js';
import { NO_TRIP_MESSAGES } from '../const.js';

const createNoTripTemplate = (message) => `<p class="trip-events__msg">${NO_TRIP_MESSAGES[message]}</p>`;

export default class NoTrip {
  constructor(message) {
    this._message = message;
    this._element = null;
  }

  getTemplate() {
    return createNoTripTemplate(this._message);
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
