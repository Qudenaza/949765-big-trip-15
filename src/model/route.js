import Observer from '../utils/observer.js';

export default class Route extends Observer {
  constructor(data) {
    super();

    this._data = data;
  }

  get data() {
    return this._data;
  }

  setData(updateType, data) {
    this._data = data;

    this._notify(updateType);
  }

  addPoint(updateType, update) {
    this._data = [
      update,
      ...this._data,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._data.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._data =  [
      ...this._data.slice(0, index),
      ...this._data.slice(index + 1),
    ];

    this._notify(updateType);
  }

  updatePoint(updateType, update) {
    const index = this._data.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._data =  [
      ...this._data.slice(0, index),
      update,
      ...this._data.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        basePrice: point.base_price,
        dateFrom: point.date_from,
        dateTo: point.date_to,
        isFavorite: point.is_favorite,
        totalPrice: point.offers.reduce((sum, current) => sum + current.price, point.base_price),
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        base_price: point.basePrice, // eslint-disable-line
        date_from: point.dateFrom, // eslint-disable-line
        date_to: point.dateTo, // eslint-disable-line
        is_favorite: point.isFavorite, // eslint-disable-line
      },
    );

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateNow;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.totalPrice;
    delete adaptedPoint.isDisabled;
    delete adaptedPoint.isSaving;
    delete adaptedPoint.isDeleting;

    return adaptedPoint;
  }
}
