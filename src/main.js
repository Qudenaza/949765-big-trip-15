import SiteMenuView from './view/site-menu.js';
import InfoView from './view/info.js';
import TotalCostView from './view/total-cost.js';
import FilterView from './view/filter.js';
import { render, RenderPosition } from './utils/render.js';
import { generateRoutePoint } from './mock/route-point.js';
import RoutePresenter from './presenter/route.js';

const ROUTE_POINTS_COUNT = 16;

const routePoints = new Array(ROUTE_POINTS_COUNT).fill().map(() => generateRoutePoint()).sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main__trip-info');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const routeContainer = document.querySelector('.page-main .page-body__container');

render(siteMenuContainer, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripFiltersContainer, new FilterView(), RenderPosition.BEFOREEND);
render(tripInfoContainer, new InfoView(), RenderPosition.BEFOREEND);
render(tripInfoContainer, new TotalCostView(routePoints), RenderPosition.BEFOREEND);


const routePresenter = new RoutePresenter(routeContainer);
routePresenter.init(routePoints);

