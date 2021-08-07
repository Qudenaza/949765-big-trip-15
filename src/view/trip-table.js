import { createElement } from '../utils.js';

const createTripTableTemplate = () => `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
</section>`;

export default class TripTable {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripTableTemplate();
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
