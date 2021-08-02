import { formatDate, calculateDuration } from '../utils.js';

const createTripPointOffersTemplate = (offers) => {
  if (!offers.length) {
    return '';
  }

  return `<ul class="event__selected-offers">
    ${offers.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus; &euro;
      <span class="event__offer-price">${offer.price}</span>
      </li>`).join('')}
    </ul>`;
};

const createTripPointScheduleTemplate = (from, to) => {
  const duration = calculateDuration(from, to);

  return `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${formatDate(from, 'YYYY-MM-DDTHH:mm:ss')}">${formatDate(from, 'HH:mm')}</time>
      &mdash;
      <time class="event__end-time" datetime="${formatDate(to, 'YYYY-MM-DDTHH:mm:ss')}">${formatDate(to, 'HH:mm')}</time>
    </p>
    <p class="event__duration">${duration}</p>
  </div>`;
};

export const createTripPointTemplate = (trip) => {
  const tripPointOffersTemplate = createTripPointOffersTemplate(trip.offers),
    tripPointSchedulteTemplate = createTripPointScheduleTemplate(trip.dateFrom, trip.dateTo);

  const favoriteClassName = trip.isFavorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn';

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${formatDate(trip.dateFrom, 'YYYY-MM-DD')}">${formatDate(trip.dateFrom, 'MMM DD')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${trip.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${trip.type} to ${trip.destination.name}</h3>
      ${tripPointSchedulteTemplate}
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${trip.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${tripPointOffersTemplate}
      <button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
