import AbstractView from './abstract.js';

const createNewButtonTemplate = () => '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>';

export default class NewButton extends AbstractView {
  getTemplate() {
    return createNewButtonTemplate();
  }

  disable() {
    this.getElement().disabled = true;
  }

  enable() {
    this.getElement().disabled = false;
  }

  _clickHandler() {
    this._callback.click();
  }

  setClickHandler(callback) {
    const target = this.getElement();

    this._callback.click = callback;

    target.addEventListener('click', this._clickHandler.bind(this));
  }
}
