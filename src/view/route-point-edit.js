import SmartView from './smart.js';
import he from 'he';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import { nanoid } from 'nanoid';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const checkSimilarOffer = (firstOffer, secondOffer) => firstOffer.title === secondOffer.title && firstOffer.price === secondOffer.price;

const createEventTypesTemplate = (blankOffers) => Object.keys(blankOffers).map((offer) => `<div class="event__type-item">
<input id="event-type-${offer}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${offer}">
<label class="event__type-label event__type-label--${offer}" for="event-type-${offer}-1">${offer = offer[0].toUpperCase() + offer.slice(1)}</label>
</div>`).join('');

const createOffersTemplate = (blankOffers, selectedOffers, isDisabled) => blankOffers.map((offer) => {
  const id = nanoid();

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${selectedOffers.find((data) => checkSimilarOffer(data, offer)) ? 'checked' : ''}  ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="event-offer-${id}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
}).join('');

const createRejectTemplate = (isNew, isDeleting) => {
  if (isDeleting) {
    return '<button class="event__reset-btn" type="reset">Deleting...</button>';
  }

  return `<button class="event__reset-btn" type="reset">${isNew ? 'Cancel' : 'Delete'}</button>`;
};

const checkDisabled = (city, dateFrom, dateTo) => {
  if (!city || !dateFrom || !dateTo) {
    return 'disabled';
  }
};

const createRoutePointEditTemplate = (data, blankOffers, destinations, isNew = false) => {
  const { basePrice, type, dateFrom, dateTo, destination: {description, pictures, name: city}, isFavorite, isDisabled, isSaving, isDeleting, offers } = data;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post" autocomplete="off">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''} required>

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypesTemplate(blankOffers)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group event__field-group--destination">
        <label class="event__label event__type-output" for="event-destination-1">${type === 'transport' ? '' : type}</label>
        <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" list="destination-list-1" ${isDisabled || type === 'transport' ? 'disabled' : ''} required value="${city}" onkeyup="this.value=''">
        <datalist id="destination-list-1">
          ${Object.keys(destinations).map((item) => `<option value="${item}"></option>`)}
        </datalist>
      </div>

      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" ${isDisabled ? 'disabled' : ''} required placeholder="--/--/-- --:--">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" ${isDisabled ? 'disabled' : ''} required placeholder="--/--/-- --:--">
      </div>

      <div class="event__field-group event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}"  ${isDisabled ? 'disabled' : ''} required>
      </div>
      <button class="event__save-btn btn btn--blue" type="submit" ${checkDisabled(city, dateFrom, dateTo, basePrice)}>${isSaving ? 'Saving...' : 'Save'}</button>
      ${createRejectTemplate(isNew, isDeleting)}
      ${isNew ? '' : `<button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button"  ${isDisabled ? 'disabled' : ''}>
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`}
    </header>
    ${!isNew && blankOffers[type].length || city ? `<section class="event__details">
      ${blankOffers[type].length ? `<section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createOffersTemplate(blankOffers[type], offers, isDisabled)}
        </div>
      </section>` : ''}

      ${city ? `<section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${pictures.map((picture) => `<img class="event__photo" src="${picture.src.replace('http', 'https')}" alt="Event photo">`).join('')}
          </div>
        </div>
      </section>` : ''}
    </section>` : ''}
  </form>
  </li>`;
};

export default class RoutePointEdit extends SmartView {
  constructor(data, blankOffers, destinations, isNew) {
    super();

    this._data = data;
    this._isNew = isNew;

    this._blankOffers = blankOffers;
    this._destinations = destinations;

    this._datepickerFrom = null;
    this._datepickerTo = null;

    this._setInnerHandlers();
  }

  getTemplate() {
    return createRoutePointEditTemplate(this._data, this._blankOffers, this._destinations, this._isNew);
  }

  _editCloseClickHandler() {
    this._callback.editClose();
  }

  _submitClickHandler(evt) {
    evt.preventDefault();

    this._callback.submit(this._data);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();

    this._callback.delete(this._data);
  }

  setEditCloseClickHandler(callback) {
    const target = this.getElement().querySelector('.event__rollup-btn');

    if (!target) {
      return;
    }

    this._callback.editClose = callback;

    target.addEventListener('click', this._editCloseClickHandler.bind(this));
  }

  setSubmitClickHandler(callback) {
    const target = this.getElement().querySelector('.event__save-btn');

    this._callback.submit = callback;

    target.addEventListener('click', this._submitClickHandler.bind(this));
  }

  setDeleteClickHandler(callback) {
    const target = this.getElement().querySelector('.event__reset-btn');

    this._callback.delete = callback;

    target.addEventListener('click', this._deleteClickHandler.bind(this));
  }

  _setInnerHandlers() {
    const target = this.getElement();

    target.querySelector('.event__type-group').addEventListener('change', this._eventTypeChangeHandler.bind(this));
    target.querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler.bind(this));
    target.querySelector('.event__input--price').addEventListener('change', this._priceChangeHandler.bind(this));

    if (target.querySelector('.event__favorite-btn')) {
      target.querySelector('.event__favorite-btn').addEventListener('click', this._favoriteChangeHandler.bind(this));
    }

    if (target.querySelector('.event__available-offers')) {
      target.querySelector('.event__available-offers').addEventListener('change', this._offersChangeHandler.bind(this));
    }
  }

  _eventTypeChangeHandler(evt) {
    this._eventType = evt.target.value;

    if (evt.target.classList.contains('event__type-toggle')) {
      return;
    }

    this.updateData({
      type: evt.target.value,
      offers: [],
    });
  }

  _destinationChangeHandler(evt) {
    const value = he.encode(evt.target.value) || this._data.destination.name;
    const destination = this._destinations[value];

    this.updateData({destination});
  }

  _dateFromChangeHandler([dateFrom]) {
    this.updateData({
      dateFrom,
    });
  }

  _dateToChangeHandler([dateTo]) {
    this.updateData({
      dateTo,
    });
  }

  _priceChangeHandler(evt) {
    const value = evt.target.value;


    if (!isNaN(value) && value >= 0) {
      this.updateData({
        basePrice: +he.encode(value),
      }, false);

      return;
    }

    this.updateData({
      basePrice: 0,
    });
  }

  _favoriteChangeHandler() {
    this.updateData({
      isFavorite: !this._data.isFavorite,
    });
  }

  _offersChangeHandler(evt) {
    let totalPrice = this._data.basePrice;

    const offers = [...evt.currentTarget.querySelectorAll('.event__offer-checkbox:checked')].map((offer) => {
      const title = offer.parentElement.querySelector('.event__offer-title').textContent;
      const price = +offer.parentElement.querySelector('.event__offer-price').textContent;

      totalPrice += price;

      return {title, price};
    });

    this.updateData({
      offers,
      totalPrice,
    }, false);
  }

  setDatepicker() {
    this.destroyDatepicker();

    this._datepickerFrom = flatpickr(this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        locale: Russian,
        enableTime: true,
        defaultDate: this._data.dateFrom,
        maxDate: this._data.dateTo,
        onClose: this._dateFromChangeHandler.bind(this),
        time_24hr: true, // eslint-disable-line
      },
    );

    this._datepickerTo = flatpickr(this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        locale: Russian,
        enableTime: true,
        minDate: this._data.dateFrom,
        defaultDate: this._data.dateTo,
        onClose: this._dateToChangeHandler.bind(this),
        time_24hr: true, // eslint-disable-line
      },
    );
  }

  destroyDatepicker() {
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerTo.destroy();

      this._datepickerFrom = null;
      this._datepickerTo = null;
    }
  }

  reset(update) {
    this.updateData(update);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setDatepicker();

    this.setSubmitClickHandler(this._callback.submit);

    this.setDeleteClickHandler(this._callback.delete);

    this.setEditCloseClickHandler(this._callback.editClose);
  }

  removeElement() {
    super.removeElement();
  }
}
