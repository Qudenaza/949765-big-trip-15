import { generateRoutePoint } from './mock/route-point.js';
import RoutePresenter from './presenter/route.js';
import InfoPresenter from './presenter/info.js';

const ROUTE_POINTS_COUNT = 5;

const routePoints = new Array(ROUTE_POINTS_COUNT).fill().map(() => generateRoutePoint());

const routeContainer = document.querySelector('.page-main .page-body__container');
const infoContainer = document.querySelector('.trip-main');

const infoPresenter = new InfoPresenter(infoContainer);
const routePresenter = new RoutePresenter(routeContainer);

infoPresenter.init(routePoints);
routePresenter.init(routePoints);

