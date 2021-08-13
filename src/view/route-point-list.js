import AbstractView from './abstract.js';

const createRoutePointListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class RoutePointList extends AbstractView {
  getTemplate() {
    return createRoutePointListTemplate();
  }
}
