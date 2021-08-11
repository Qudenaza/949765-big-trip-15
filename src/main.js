import SiteMenuView from './view/site-menu.js';
import InfoView from './view/info.js';
import TotalCostView from './view/total-cost.js';
import FilterView from './view/filter.js';
import TripTableView from './view/trip-table.js';
import NoTripView from './view/no-trip.js';
import SortView from './view/sort.js';
import TripPointEditView from './view/edit/trip-point-edit.js';
import TripPointListView from './view/trip-point-list.js';
import TripPointView from './view/trip-point.js';
import { generateTripPoint } from './mock/trip.js';
import { render, RenderPosition, replace } from './utils/render.js';

const TRIP_POINTS_COUNT = 16;

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(() => generateTripPoint()).sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main__trip-info');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripTableContainer = document.querySelector('.page-main .page-body__container');

const renderTripPoint = (tripPointsListElement, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const tripPointEditComponent = new TripPointEditView(tripPoint);

  const replacePointToForm = () => {
    replace(tripPointEditComponent, tripPointComponent);
  };

  const replaceFormToPoint = () => {
    replace(tripPointComponent,  tripPointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      replaceFormToPoint();

      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripPointComponent.setClickHandler(() => {
    replacePointToForm();

    document.addEventListener('keydown', onEscKeyDown);
  });

  tripPointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();

    document.removeEventListener('keydown', onEscKeyDown);
  });

  tripPointEditComponent.setClickHandler(() => {
    replaceFormToPoint();

    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(tripPointsListElement, tripPointComponent, RenderPosition.BEFOREEND);
};

const renderTripTable = (container, events) => {
  const tripTableComponent = new TripTableView();
  const tripPointListComponent = new TripPointListView();
  const sortComponent = new SortView();

  render(container, tripTableComponent, RenderPosition.BEFOREEND);

  if (!events.length) {
    const noTripContainer = document.querySelector('.trip-events');
    const chosenFilter = document.querySelector('.trip-filters input[checked]').value;

    render(noTripContainer, new NoTripView(chosenFilter), RenderPosition.BEFOREEND);

    return;
  }

  render(container, sortComponent, RenderPosition.BEFOREEND);
  render(container, tripPointListComponent, RenderPosition.BEFOREEND);

  const tripPointsListElement = document.querySelector('.trip-events__list');

  tripPoints.forEach((point) => renderTripPoint(tripPointsListElement, point));
};

render(siteMenuContainer, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripFiltersContainer, new FilterView(), RenderPosition.BEFOREEND);
render(tripInfoContainer, new InfoView(), RenderPosition.BEFOREEND);
render(tripInfoContainer, new TotalCostView(tripPoints), RenderPosition.BEFOREEND);

renderTripTable(tripTableContainer, tripPoints);

