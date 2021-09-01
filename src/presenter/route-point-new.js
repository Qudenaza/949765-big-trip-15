import RoutePointEditView from '../view/route-point-edit.js';
import { nanoid } from 'nanoid';
import { remove, render, replace, RenderPosition } from '../utils/render.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';
import { BLANK_DATA } from '../const.js';

export default class RoutePointNew {
  constructor(container, noRoute, newButton, changeData, mockModel, filterModel) {
    this._container = container;
    this._changeData = changeData;

    this._mockModel = mockModel;
    this._filterModel = filterModel;

    this._noRouteComponent = noRoute;
    this._routePointEditComponent = null;
    this._newButtonComponent = newButton;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._routePointEditComponent !== null) {
      return;
    }

    this._routePointEditComponent = new RoutePointEditView(BLANK_DATA, this._mockModel.offers, this._mockModel.destinations, true);
    this._routePointEditComponent.setSubmitClickHandler(this._handleFormSubmit.bind(this));
    this._routePointEditComponent.setDeleteClickHandler(this._handleDeleteClick.bind(this));
    this._routePointEditComponent.setDatepicker();

    this._newButtonComponent.disable();

    render(this._container, this._routePointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._routePointEditComponent === null) {
      return;
    }

    remove(this._routePointEditComponent);

    if (!this._container.getElement().children.length) {
      this._noRouteComponent.message = this._filterModel.filter;


      replace(this._noRouteComponent, this._container);
    }

    this._routePointEditComponent.destroyDatepicker();

    this._routePointEditComponent = null;

    this._newButtonComponent.enable();

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(update) {
    const totalPrice = update.basePrice + update.offers.reduce((sum, current) => sum + current.price, 0);

    this._changeData(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MAJOR,
      Object.assign({id: nanoid()}, update, {totalPrice}),
    );

    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this.destroy();
    }
  }
}