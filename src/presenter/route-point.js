import RoutePointView from '../view/route-point.js';
import RoutePointEditView from '../view/route-point-edit.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { isDatesEqual } from '../utils/date.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class RoutePoint {
  constructor(container, changeData, changeMode, mockModel) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._mockModel = mockModel;

    this._routePointComponent = null;
    this._routePointEditComponent = null;

    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(data) {
    this._data = data;

    const prevRoutePointComponent = this._routePointComponent;
    const prevRoutePointEditComponent = this._routePointEditComponent;

    this._routePointComponent = new RoutePointView(this._data);
    this._routePointEditComponent = new RoutePointEditView(this._data, this._mockModel.offers, this._mockModel.destinations);

    this._routePointComponent.setEditOpenClickHandler(this._handleOpenEditClick.bind(this));
    this._routePointComponent.setFavoriteClickHandler(this._handleFavoriteClick.bind(this));
    this._routePointEditComponent.setSubmitClickHandler(this._handleSubmitClick.bind(this));
    this._routePointEditComponent.setEditCloseClickHandler(this._handleCloseEditClick.bind(this));
    this._routePointEditComponent.setDeleteClickHandler(this._handleDeleteClick.bind(this));
    this._routePointEditComponent.setFavoriteClickHandler(this._handleFavoriteClick.bind(this));


    if (prevRoutePointComponent === null || prevRoutePointEditComponent === null) {
      render(this._container, this._routePointComponent, RenderPosition.BEFOREEND);

      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._routePointComponent, prevRoutePointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._routePointEditComponent, prevRoutePointEditComponent);
    }

    remove(prevRoutePointComponent);
    remove(prevRoutePointEditComponent);
  }

  destroy() {
    remove(this._routePointComponent);
    remove(this._routePointEditComponent);
  }

  _replacePointToEdit() {
    replace(this._routePointEditComponent, this._routePointComponent);

    document.addEventListener('keydown', this._escKeyDownHandler);

    this._routePointEditComponent.setDatepicker();

    this._changeMode();

    this._mode = Mode.EDITING;
  }

  _replaceEditToPoint() {
    replace(this._routePointComponent, this._routePointEditComponent);

    document.removeEventListener('keydown', this._escKeyDownHandler);

    this._routePointEditComponent.destroyDatepicker();

    this._mode = Mode.DEFAULT;
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._routePointEditComponent.reset(this._data);

      this._replaceEditToPoint();
    }
  }

  _handleOpenEditClick() {
    this._replacePointToEdit();
  }

  _handleFavoriteClick(update, edit) {
    this._changeData(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.MINOR,
      Object.assign(
        {},
        update,
        { isFavorite: !update.isFavorite },
      ),
    );

    if (edit) {
      this._routePointEditComponent.reset(update);
      this.init(update);
    }
  }

  _handleCloseEditClick() {
    this._routePointEditComponent.reset(this._data);

    this._replaceEditToPoint();
  }

  _handleSubmitClick(update) {
    const isMinorUpdate = isDatesEqual(this._data.dateFrom, update.dateFrom) && isDatesEqual(this._data.dateTo, update.dateTo);
    const totalPrice = update.basePrice + update.offers.reduce((sum, current) => sum + current.price, 0);

    this._changeData(
      USER_ACTION.UPDATE_POINT,
      isMinorUpdate ? UPDATE_TYPE.MINOR : UPDATE_TYPE.MAJOR,
      update,
      {totalPrice},
    );

    this._replaceEditToPoint();
  }

  _handleDeleteClick(update) {
    this._changeData(
      USER_ACTION.DELETE_POINT,
      UPDATE_TYPE.MAJOR,
      update,
    );

    this._replaceEditToPoint();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this._routePointEditComponent.reset(this._data);

      this._replaceEditToPoint();

      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }
}
