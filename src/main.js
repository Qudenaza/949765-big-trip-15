import { generateRoutePoint } from './mock/route-point.js';
import RoutePresenter from './presenter/route.js';
import FilterPresenter from './presenter/filter.js';
import InfoPresenter from './presenter/info.js';
import RouteModel from './model/route.js';
import FilterModel from './model/filter.js';

const ROUTE_POINTS_COUNT = 5;

const routePoints = new Array(ROUTE_POINTS_COUNT).fill().map(() => generateRoutePoint());

const routeContainer = document.querySelector('.page-main .page-body__container');
const filtersContainer = document.querySelector('.trip-controls__filters');
const infoContainer = document.querySelector('.trip-main');

const routeModel = new RouteModel();
routeModel.routePoints = routePoints;

const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter(infoContainer);
const routePresenter = new RoutePresenter(routeContainer, routeModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, routeModel);

infoPresenter.init(routePoints);
filterPresenter.init();
routePresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();

  routePresenter.createRoutePoint();
});
