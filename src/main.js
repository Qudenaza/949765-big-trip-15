import { generateRoutePoint } from './mock/route-point.js';
import RoutePresenter from './presenter/route.js';
import FilterPresenter from './presenter/filter.js';
import InfoPresenter from './presenter/info.js';
import StatisticsPresenter from './presenter/statistics.js';
import RouteModel from './model/route.js';
import FilterModel from './model/filter.js';
import SiteMenuView from './view/site-menu.js';
import { MENU_ITEM, UPDATE_TYPE, filterType } from './const.js';
import { render, RenderPosition } from './utils/render.js';
import { handlePseudo } from './utils/common.js';

const ROUTE_POINTS_COUNT = 5;

const routePoints = new Array(ROUTE_POINTS_COUNT).fill().map(() => generateRoutePoint());

const routeModel = new RouteModel();
routeModel.routePoints = routePoints;

const filterModel = new FilterModel();

const routeContainer = document.querySelector('.page-main .page-body__container');
const filtersContainer = document.querySelector('.trip-controls__filters');
const infoContainer = document.querySelector('.trip-main');
const siteMenuContainer = document.querySelector('.trip-controls__navigation');

const siteMenuComponent = new SiteMenuView();
render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);

const infoPresenter = new InfoPresenter(infoContainer);
const routePresenter = new RoutePresenter(routeContainer, routeModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, routeModel);
const statisticsPresenter = new StatisticsPresenter(routeContainer, routeModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MENU_ITEM.ROUTE:
      siteMenuComponent.setMenuItem(MENU_ITEM.ROUTE);

      statisticsPresenter.destroy();

      filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType.ALL);

      routePresenter.init();

      filterPresenter.enableFilters();

      handlePseudo();
      break;
    case MENU_ITEM.STATS:
      siteMenuComponent.setMenuItem(MENU_ITEM.STATS);

      routePresenter.destroy();

      statisticsPresenter.init();

      filterPresenter.disableFilters();

      handlePseudo(true);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

infoPresenter.init(routePoints);
filterPresenter.init();
routePresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();

  routePresenter.createRoutePoint();
});
