import AbstractView from './abstract.js';

const createDetailTemplate = () => `<div class="trip-info__main">
  <h1 class="trip-info__title">NULL</h1>
  <p class="trip-info__dates">NULL</p>
</div>`;

export default class Detail extends AbstractView {
  getTemplate() {
    return createDetailTemplate();
  }
}
