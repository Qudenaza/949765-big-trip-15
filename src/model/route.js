import Observer from '../utils/observer.js';
import { formatDate } from '../utils/date.js';

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
    const adaptedPoint = {
      id: point['id'],
      basePrice: point['base_price'],
      dateFrom: new Date(point['date_from']),
      dateTo: new Date(point['date_to']),
      totalPrice: point.offers.reduce((sum, current) => sum + current['price'], point['base_price']),
      isFavorite: point['is_favorite'],
      offers: point['offers'],
      destination: point['destination'],
      type: point['type'],
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = {
      'id': point['id'],
      'type': point['type'],
      'offers': point['offers'],
      'destination': point['destination'],
      'base_price': point['basePrice'],
      'date_from': formatDate(point['dateFrom']),
      'date_to': formatDate(point['dateTo']),
      'is_favorite': point['isFavorite'],
    };

    return adaptedPoint;
  }
}
