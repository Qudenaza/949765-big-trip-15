import { createElement } from '../utils/render.js';

export default class Abstract {
  constructor() {
    this._element = null;

    this._callback = {};
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  removeElement() {
    this._element = null;
  }
}
