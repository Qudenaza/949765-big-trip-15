import AbstractView from './abstract.js';
import { formatDate } from '../utils/date.js';

const createRouteTemplate = (routeTrip) => {
  if (!routeTrip) {
    return '';
  }

  return routeTrip.length <= 3 ? routeTrip.map((point, index, trip) => {
    if (index + 1 === trip.length) {
      return `${point}`;
    }

    return `${point} &mdash; `;
  }).join('') : `${routeTrip[0]} &mdash; &#8230; &mdash; ${routeTrip[routeTrip.length - 1]}`;
};

const createRouteDatesTemplate = (routeDates) => {
  if (!routeDates) {
    return '';
  }

  return routeDates.map((date, index) => {
    if (index === 1) {
      return ` &mdash; ${formatDate(date, 'MMM DD')}`;
    }

    return formatDate(date, 'MMM DD');
  }).join('');
};

const createDetailTemplate = (routeTrip, routeDates) => `<div class="trip-info__main">
  <h1 class="trip-info__title">${createRouteTemplate(routeTrip)}</h1>
  <p class="trip-info__dates">${createRouteDatesTemplate(routeDates)}</p>
</div>`;

export default class Trip extends AbstractView {
  constructor(routeTrip, routeDates) {
    super();

    this._routeTrip = routeTrip;
    this._routeDates = routeDates;
  }

  getTemplate() {
    return createDetailTemplate(this._routeTrip, this._routeDates);
  }

  updateRouteDetails(routeTrip, routeDates) {
    const tripElement = this.getElement().querySelector('.trip-info__title');
    const datesElement = this.getElement().querySelector('.trip-info__dates');

    tripElement.innerHTML = createRouteTemplate(routeTrip);
    datesElement.innerHTML = createRouteDatesTemplate(routeDates);
  }
}
