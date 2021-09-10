import SmartView from './smart.js';

const createStatsTemplate = () => `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>
  <div class="statistics__item">
    <canvas class="statistics__chart" id="money" width="900"></canvas>
  </div>
  <div class="statistics__item">
    <canvas class="statistics__chart" id="type" width="900"></canvas>
  </div>
  <div class="statistics__item">
    <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
  </div>
</section>`;

export default class Stats extends SmartView {
  getTemplate() {
    return createStatsTemplate();
  }

  setCharts(moneyChart, typeChart, timeChart) {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    this._moneyChart = moneyChart(moneyCtx);
    this._typeChart = typeChart(typeCtx);
    this._timeChart = timeChart(timeCtx);
  }
}
