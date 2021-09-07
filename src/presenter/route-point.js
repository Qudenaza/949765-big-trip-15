import RoutePointView from '../view/route-point.js';
import RoutePointEditView from '../view/route-point-edit.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { isDatesEqual } from '../utils/date.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';
import { isOnline } from '../utils/common.js';
import { toast } from '../utils/toast.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
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


    if (prevRoutePointComponent === null || prevRoutePointEditComponent === null) {
      render(this._container, this._routePointComponent, RenderPosition.BEFOREEND);

      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._routePointComponent, prevRoutePointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._routePointComponent, prevRoutePointEditComponent);

      this._mode = Mode.DEFAULT;
    }

    remove(prevRoutePointComponent);
    remove(prevRoutePointEditComponent);
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._routePointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._routePointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._routePointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._routePointComponent.shake(resetFormState);
        this._routePointEditComponent.shake(resetFormState);
        break;
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._routePointEditComponent.reset(this._data);

      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._routePointComponent);

    this._routePointEditComponent.destroyDatepicker();

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

  _handleOpenEditClick() {
    if (!isOnline()) {
      toast('You can\'t edit point offline');

      return;
    }

    this._replacePointToEdit();
  }

  _handleFavoriteClick(update) {
    this._changeData(
      USER_ACTION.UPDATE_POINT,
      UPDATE_TYPE.MINOR,
      Object.assign(
        {},
        update,
        { isFavorite: !update.isFavorite },
      ),
    );
  }

  _handleCloseEditClick() {
    this._routePointEditComponent.reset(this._data);

    this._replaceEditToPoint();
  }

  _handleSubmitClick(update) {
    if (!isOnline()) {
      toast('You can\'t save point offline');

      this.setViewState(State.ABORTING);

      return;
    }

    const isMinorUpdate = this._data.basePrice === update.basePrice && (isDatesEqual(this._data.dateFrom, update.dateFrom) && isDatesEqual(this._data.dateTo, update.dateTo));

    this._changeData(
      USER_ACTION.UPDATE_POINT,
      isMinorUpdate ? UPDATE_TYPE.MINOR : UPDATE_TYPE.MAJOR,
      update,
    );
  }

  _handleDeleteClick(update) {
    if (!isOnline()) {
      toast('You can\'t delete point offline');

      this.setViewState(State.ABORTING);

      return;
    }

    this._changeData(
      USER_ACTION.DELETE_POINT,
      UPDATE_TYPE.MAJOR,
      update,
    );
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
