import RoutePointEditView from '../view/edit/route-point-edit.js';
import { getUniqueID } from '../utils/common.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';

export default class RoutePointNew {
  constructor(routePointListContainer, changeData) {
    this._routePointListContainer = routePointListContainer;
    this._changeData = changeData;

    this._routePointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._routePointEditComponent !== null) {
      return;
    }

    this._routePointEditComponent = new RoutePointEditView(undefined, false);
    this._routePointEditComponent.setSubmitHandler(this._handleFormSubmit);
    this._routePointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._routePointListContainer, this._routePointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._routePointEditComponent === null) {
      return;
    }

    remove(this._routePointEditComponent);

    this._routePointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(update) {
    this._changeData(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MINOR,
      Object.assign({id: getUniqueID()}, update),
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
