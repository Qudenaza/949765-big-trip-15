import AbstractView from './abstract.js';

const createRouteTemplate = () => `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
</section>`;

export default class Route extends AbstractView {
  getTemplate() {
    return createRouteTemplate();
  }
}
