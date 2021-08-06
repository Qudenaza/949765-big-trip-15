import SiteMenuView from './view/site-menu.js';
import InfoView from './view/info.js';
import TotalCostView from './view/total-cost.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import EditView from './view/edit/trip-point-edit.js';
import TripPointView from './view/trip-point.js';
import { generateTripPoint } from './mock/trip.js';
import { render, RenderPosition } from './utils.js';

const TRIP_POINTS_COUNT = 16;

const tripPoints = new Array(TRIP_POINTS_COUNT).fill().map(() => generateTripPoint()).sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main__trip-info');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsListElement = document.querySelector('.trip-events__list');

render(siteMenuContainer, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripFiltersContainer, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(tripInfoContainer, new InfoView().getElement(), RenderPosition.BEFOREEND);
render(tripInfoContainer, new TotalCostView(tripPoints).getElement(), RenderPosition.BEFOREEND);
render(tripEventsListElement, new SortView().getElement(), RenderPosition.BEFOREBEGIN);
render(tripEventsListElement, new EditView().getElement(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
  render(tripEventsListElement, new TripPointView(tripPoints[i]).getElement(), RenderPosition.BEFOREEND);
}
