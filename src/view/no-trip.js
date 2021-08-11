import AbstractView from './abstract.js';

const NO_TRIP_MESSAGES = {
  'everything': 'Click New Event to create your first point',
  'future': 'There are no future events now',
  'past': 'There are no past events now',
};

const createNoTripTemplate = (message) => `<p class="trip-events__msg">${NO_TRIP_MESSAGES[message]}</p>`;

export default class NoTrip extends AbstractView {
  constructor(message) {
    super();

    this._message = message;
  }

  getTemplate() {
    return createNoTripTemplate(this._message);
  }
}
