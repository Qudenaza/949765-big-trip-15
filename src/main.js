import { createSiteMenuTemplate } from './view/site-menu.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createTripCostTemplate } from './view/trip-cost.js';
import { createTripFiltersTemplate } from './view/trip-filters.js';
import { createTripSortingTemplate } from './view/trip-sorting.js';
import { createAddNewPointTemplate } from './view/add-new-point.js';
import { createTripPointTemplate } from './view/trip-point.js';

const TRIP_POINTS_COUNT = 3;

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main__trip-info');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsListElement = document.querySelector('.trip-events__list');

render(siteMenuContainer, createSiteMenuTemplate(), 'beforeend');
render(tripInfoContainer, createTripInfoTemplate(), 'beforeend');
render(tripInfoContainer, createTripCostTemplate(), 'beforeend');
render(tripFiltersContainer, createTripFiltersTemplate(), 'beforeend');
render(tripEventsListElement, createTripSortingTemplate(), 'beforebegin');
render(tripEventsListElement, createAddNewPointTemplate(), 'afterbegin');

for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
  render(tripEventsListElement, createTripPointTemplate(), 'beforeend');
}
