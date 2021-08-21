import RoutePointView from '../view/route-point.js';
import RoutePointEditView from '../view/edit/route-point-edit.js';
import { render, replace, remove, RenderPosition } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class RoutePoint {
  constructor(container, changeData, removeData, changeMode) {
    this._routePointContainer = container;
    this._changeData = changeData;
    this._removeData = removeData;
    this._changeMode = changeMode;

    this._routePointComponent = null;
    this._routePointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditOpenClick = this._handleEditOpenClick.bind(this);
    this._handleEditCloseClick = this._handleEditCloseClick.bind(this);
    this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._routePoint = point;

    const prevRoutePointComponent = this._routePointComponent;
    const prevRoutePointEditComponent = this._routePointEditComponent;

    this._routePointComponent = new RoutePointView(this._routePoint);
    this._routePointEditComponent = new RoutePointEditView(this._routePoint);

    this._routePointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._routePointComponent.setOpenClickHandler(this._handleEditOpenClick);
    this._routePointEditComponent.setCloseClickHandler(this._handleEditCloseClick);
    this._routePointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._routePointEditComponent.setSubmitHandler(this._handleFormSubmitClick);

    if (prevRoutePointComponent === null || prevRoutePointEditComponent === null) {
      render(this._routePointContainer, this._routePointComponent, RenderPosition.BEFOREEND);

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

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._routePointEditComponent, this._routePointComponent);

    document.addEventListener('keydown', this._escKeyDownHandler);

    this._changeMode();

    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._routePointComponent,  this._routePointEditComponent);

    document.removeEventListener('keydown', this._escKeyDownHandler);

    this._mode = Mode.DEFAULT;
  }

  _handleDeleteClick() {
    this._replaceFormToPoint();

    this._removeData(this._routePoint);
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._routePoint,
        {
          isFavorite: !this._routePoint.isFavorite,
        },
      ),
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this._routePointEditComponent.reset(this._routePoint);

      this._replaceFormToPoint();

      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleEditOpenClick() {
    this._replacePointToForm();
  }

  _handleEditCloseClick() {
    this._routePointEditComponent.reset(this._routePoint);

    this._replaceFormToPoint();
  }

  _handleFormSubmitClick() {
    this._changeData(this._routePoint);

    this._replaceFormToPoint();
  }
}
