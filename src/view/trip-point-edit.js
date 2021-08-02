import { formatDate, isEmptyObject } from '../utils.js';

const createDateTemplate = (from, to) => {
  const dateFromFormated = formatDate(from, 'DD/MM/YY HH:mm'),
    dateToFormated = formatDate(to, 'DD/MM/YY HH:mm');

  return `<div class="event__field-group event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromFormated}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToFormated}">
  </div>`;
};

const createTypeListTemplate = (type) => (`<div class="event__type-wrapper">
  <label class="event__type event__type-btn" for="event-type-toggle-1">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
  </label>
  <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      <div class="event__type-item">
        <input id="event-type-taxi-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="taxi">
        <label class="event__type-label event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-bus-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="bus">
        <label class="event__type-label event__type-label--bus" for="event-type-bus-1">Bus</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-train-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="train">
        <label class="event__type-label event__type-label--train" for="event-type-train-1">Train</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-ship-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="ship">
        <label class="event__type-label event__type-label--ship" for="event-type-ship-1">Ship</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
        <label class="event__type-label event__type-label--transport" for="event-type-transport-1">Transport</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-drive-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="drive">
        <label class="event__type-label event__type-label--drive" for="event-type-drive-1">Drive</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-flight-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="flight" checked>
        <label class="event__type-label event__type-label--flight" for="event-type-flight-1">Flight</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-check-in-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="check-in">
        <label class="event__type-label event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-sightseeing-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="sightseeing">
        <label class="event__type-label event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-restaurant-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="restaurant">
        <label class="event__type-label event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
      </div>
    </fieldset>
  </div>
</div>`);

const createDestinationTemplate = (type, city) => (`<div class="event__field-group event__field-group--destination">
  <label class="event__label event__type-output" for="event-destination-1">${type} to</label>
  <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
  <datalist id="destination-list-1">
    <option value="Amsterdam"></option>
    <option value="Geneva"></option>
    <option value="Chamonix"></option>
  </datalist>
</div>`);

const createOffersTemplate = (offers) => (offers.length ?
  `<section class="event__section event__section--offers">
    <h3 class="event__section-title event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
  ${offers.map((offer) => {
    const randomId = Math.random().toFixed(3);

    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-offer-${randomId}" type="checkbox" name="event-offer-${randomId}">
        <label class="event__offer-label" for="event-offer-${randomId}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
  }).join('')}
    </div>
  </section>` : '');

const createDescriptionTemplate = (destination) => (destination.pictures.length ?
  `<section class="event__section event__section--destination">
    <h3 class="event__section-title event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo">`).join('')}
      </div>
    </div>
  </section>`: '');

export const createTripPointEditTemplate = (trip = {}) => {
  const {
    basePrice = '',
    dateFrom = new Date(),
    dateTo = new Date(),
    type = 'taxi',
    offers = [
      {
        title: 'Upgrade to a business class',
        price: 190,
      },
      {
        title: 'Choose the radio station',
        price: 30,
      },
      {
        title: 'Choose temperature',
        price: 170,
      },
      {
        title: 'Drive quickly, I\'m in a hurry',
        price: 100,
      },
      {
        title: 'Drive slowly',
        price: 110,
      },
    ],
    destination = {
      description: '',
      name: '',
      pictures: [],
    },
    isFavorite = false,
  } = trip;

  const editPointDateTemplate = createDateTemplate(dateFrom, dateTo),
    editPointTypeListTemplate = createTypeListTemplate(type),
    editPointDestinationTemplate = createDestinationTemplate(type, destination.name),
    editPointOffersTemplate = createOffersTemplate(offers),
    editPointDescriptionTemplate = createDescriptionTemplate(destination);

  const tripEdit = isEmptyObject(trip);

  const favoriteClassName = isFavorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn';

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${editPointTypeListTemplate}
      ${editPointDestinationTemplate}
      ${editPointDateTemplate}
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${tripEdit ? 'Cancel' : 'Delete'}</button>
      ${!tripEdit ? `<button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>` : ''}
    </header>
    ${editPointDateTemplate || editPointDescriptionTemplate ?
    `<section class="event__details">
      ${editPointOffersTemplate}
      ${editPointDescriptionTemplate}
    </section>` : ''}
  </form>
</li>`;
};

