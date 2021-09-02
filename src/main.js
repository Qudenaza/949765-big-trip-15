import RouteBoardPresenter from './presenter/route-board.js';
import StatsPresenter from './presenter/stats.js';
import FilterPresenter from './presenter/filter.js';
import DetailPresenter from './presenter/detail.js';
import RouteModel from './model/route.js';
import FilterModel from './model/filter.js';
import MockModel from './model/mock.js';
import SiteMenuView from './view/site-menu.js';
import Api from './api.js';
import { END_POINT, AUTHORIZATION, UPDATE_TYPE, MENU_ITEM, FILTER_TYPE } from './const.js';
import { render, RenderPosition } from './utils/render.js';

const detailContainer = document.querySelector('.trip-main');
const statsContainer = document.querySelector('.page-main .page-body__container');
const routePointsBoardContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const siteMenuContainer = document.querySelector('.trip-controls__navigation');

const siteMenuComponent = new SiteMenuView();
render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);

const api = new Api(END_POINT, AUTHORIZATION);

const routeModel = new RouteModel();
const filterModel = new FilterModel();
const mockModel = new MockModel();

const models = new Map();
models.set('routeModel', routeModel);
models.set('filterModel', filterModel);
models.set('mockModel', mockModel);

const detailPresenter = new DetailPresenter(detailContainer, models);
const statsPresenter = new StatsPresenter(statsContainer, models);
const routeBoardPresenter = new RouteBoardPresenter(routePointsBoardContainer, models, api);
const filterPresenter = new FilterPresenter(filterContainer, models);

const getDataFromServer = async () => {
  let blankOffers, blankDestinations, routePoints;

  await api.getOffers().then((offers) => {
    blankOffers = offers;
  });

  await api.getDestinations().then((destinations) => {
    blankDestinations = destinations;
  });

  await api.getPoints().then((points) => {
    routePoints = points;
  });

  mockModel.setOffersData(blankOffers);
  mockModel.setDestinationsData(blankDestinations);
  routeModel.setData(UPDATE_TYPE.INIT, routePoints);
};

getDataFromServer();

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MENU_ITEM.ROUTE:
      siteMenuComponent.setMenuItem(MENU_ITEM.ROUTE);

      statsPresenter.destroy();

      filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.ALL);

      routeBoardPresenter.init(true);

      filterPresenter.enableFilters();
      break;
    case MENU_ITEM.STATS:
      siteMenuComponent.setMenuItem(MENU_ITEM.STATS);

      routeBoardPresenter.destroy(true);

      statsPresenter.init();

      filterPresenter.disableFilters();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

detailPresenter.init();
filterPresenter.init();
routeBoardPresenter.init();

