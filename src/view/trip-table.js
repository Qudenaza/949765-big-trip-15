import AbstractView from './abstract.js';

const createTripTableTemplate = () => `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
</section>`;

export default class TripTable extends AbstractView {
  getTemplate() {
    return createTripTableTemplate();
  }
}