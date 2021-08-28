import AbstractView from './abstract.js';
import { MENU_ITEM } from '../const.js';

const createSiteMenuTemplate = () => `<nav class="trip-controls__trip-tabs trip-tabs">
  <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-value="${MENU_ITEM.ROUTE}">${MENU_ITEM.ROUTE}</a>
  <a class="trip-tabs__btn" href="#" data-value="${MENU_ITEM.STATS}">${MENU_ITEM.STATS}</a>
</nav>`;

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();

    this._callback.menuClick(evt.target.dataset.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;

    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const tabs = this.getElement().querySelectorAll('a');
    const target = this.getElement().querySelector(`[data-value='${menuItem}']`);

    tabs.forEach((tab) => tab.classList.remove('trip-tabs__btn--active'));

    target.classList.add('trip-tabs__btn--active');
  }
}
