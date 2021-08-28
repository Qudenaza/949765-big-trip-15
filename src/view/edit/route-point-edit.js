import SmartView from '../smart.js';
import { BLANK_ROUTE_POINT, OFFER_TYPES } from '../../const.js';
import { createDateTemplate } from './date.js';
import { createTypeListTemplate } from './type-list.js';
import { createDestinationTemplate } from './destination.js';
import { createOffersTemplate } from './offers.js';
import { createDescriptionTemplate } from './description.js';
import { generateDescription, generatePictures } from '../../mock/route-point.js';
import flatpickr from 'flatpickr';
import { formatDate } from '../../utils/date.js';

import '../../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEditTemplate = (routeData, isEdit) => {
  const { basePrice, dateFrom, dateTo, type, destination, offers, isFavorite } = routeData;
  const dateTemplate = createDateTemplate(dateFrom, dateTo);
  const typeListTemplate = createTypeListTemplate(type);
  const destinationTemplate = createDestinationTemplate(type, destination.name);
  const offersTemplate = createOffersTemplate(offers, OFFER_TYPES[type], isEdit);
  const descriptionTemplate = createDescriptionTemplate(destination);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${typeListTemplate}
      ${destinationTemplate}
      ${dateTemplate}
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input event__input--price" id="event-price-1" type="number" name="event-price" value=${basePrice}>
      </div>
      <button class="event__save-btn btn btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${isEdit ? 'Delete' : 'Cancel'}</button>
      ${isEdit ? `<button class="${isFavorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn'}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>` : ''}
    </header>
    ${offersTemplate || descriptionTemplate ?
    `<section class="event__details">
      ${offersTemplate}
      ${descriptionTemplate}
    </section>` : ''}
  </form>
</li>`;
};

export default class RoutePointEdit extends SmartView {
  constructor(routePoint = BLANK_ROUTE_POINT, isEdit = false) {
    super();

    this._data = routePoint;
    this._datepickerFrom = null;
    this._datepickerTo = null;
    this._isEdit = isEdit;

    this._eventType = this._data.type;

    this._submitHandler = this._submitHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceChangeHandler  = this._priceChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  _setDatepicker() {
    this._resetDatepicker();

    this._datepickerFrom = flatpickr(this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:m',
        enableTime: true,
        maxDate: this._data.dateTo,
        defaultDate: this._data.dateFrom,
        onClose: this._dateFromChangeHandler,
      },
    );

    this._datepickerTo = flatpickr(this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:m',
        enableTime: true,
        minDate: this._data.dateFrom,
        defaultDate: this._data.dateTo,
        onClose: this._dateToChangeHandler,
      },
    );
  }

  reset(routePoint) {
    this.updateData(routePoint);
  }

  getTemplate() {
    return createEditTemplate(this._data, this._isEdit);
  }

  _submitHandler(evt) {
    evt.preventDefault();

    this._callback.submit(this._data);

    this._eventType = null;
  }

  _closeClickHandler() {
    this._callback.closeClick();
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();

    this._callback.deleteClick();
  }

  setSubmitHandler(callback) {
    const target = this.getElement().querySelector('form');

    this._callback.submit = callback;

    target.addEventListener('submit', this._submitHandler);
  }

  setCloseClickHandler(callback) {
    if (!this.getElement().querySelector('form .event__rollup-btn')) {
      return;
    }

    const target = this.getElement().querySelector('form .event__rollup-btn');

    this._callback.closeClick = callback;

    target.addEventListener('click', this._closeClickHandler);
  }

  setDeleteClickHandler(callback) {
    const target = this.getElement().querySelector('.event__reset-btn');

    this._callback.deleteClick = callback;

    target.addEventListener('click', this._deleteClickHandler);
  }

  _dateFromChangeHandler([dateFrom]) {
    this.updateData({
      dateFrom: formatDate(dateFrom, null, true),
    });
  }

  _dateToChangeHandler([dateTo]) {
    this.updateData({
      dateTo: formatDate(dateTo, null, true),
    });
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
    const value = evt.target.value;

    if (!evt.target.value) {
      this.updateData({
        destination: {
          description: '',
          name: value,
          pictures: [],
        },
      });

      return;
    }

    this.updateData({
      destination: {
        description: generateDescription(),
        name: value,
        pictures: generatePictures(),
      },
    });
  }

  _priceChangeHandler(evt) {
    const value = evt.target.value;

    if (!isNaN(value) && value >= 0) {
      this.updateData({
        basePrice: value,
      });

      return;
    }

    this.updateData({
      basePrice: 0,
    });
  }

  _offersChangeHandler(evt) {
    const inputs = evt.currentTarget.querySelectorAll('.event__offer-checkbox:checked');
    const offers = [...inputs].map((offer) => OFFER_TYPES[this._eventType].find((item) => item.id === offer.dataset.id));

    this.updateData({
      offers,
    }, true);
  }

  _setInnerHandlers() {
    const target = this.getElement();

    target.querySelector('.event__type-group').addEventListener('change', this._eventTypeChangeHandler);
    target.querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
    target.querySelector('.event__input--price').addEventListener('change', this._priceChangeHandler);

    if (target.querySelector('.event__available-offers')) {
      target.querySelector('.event__available-offers').addEventListener('change', this._offersChangeHandler);
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setSubmitHandler(this._callback.submit);

    this._setDatepicker();

    this.setDeleteClickHandler(this._callback.deleteClick);

    this.setCloseClickHandler(this._callback.closeClick);
  }

  _resetDatepicker() {
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerTo.destroy();

      this._datepickerFrom = null;
      this._datepickerTo = null;
    }
  }

  removeElement() {
    this._resetDatepicker();

    super.removeElement();
  }
}
