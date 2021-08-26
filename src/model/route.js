import AbstractObserver from '../utils/observer.js';

export default class Route extends AbstractObserver {
  constructor() {
    super();

    this._routePoints = [];
  }

  get routePoints() {
    return this._routePoints.slice();
  }

  set routePoints(routePoints) {
    this._routePoints = routePoints;
  }

  get size() {
    return this._routePoints.length;
  }

  addPoint(updateType, update) {
    this._routePoints = [
      update,
      ...this._routePoints,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._routePoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._routePoints =  [
      ...this._routePoints.slice(0, index),
      ...this._routePoints.slice(index + 1),
    ];

    this._notify(updateType);
  }

  updatePoint(updateType, update) {
    const index = this._routePoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._routePoints =  [
      ...this._routePoints.slice(0, index),
      update,
      ...this._routePoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
