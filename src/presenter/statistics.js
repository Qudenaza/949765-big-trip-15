import StatisticsView from '../view/statistics.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { remove } from '../utils/render.js';
import { calculateDuration } from '../utils/date.js';
import { BACKGROUND_COLORS } from '../const.js';
import { calculateCost, calculateType, calculateTime } from '../utils/statistics.js';
import { render, RenderPosition } from '../utils/render.js';

export default class Statistics {
  constructor(container, routeModel) {
    this._container = container;
    this._routeModel = routeModel;

    this._renderMoneyChart = this._renderMoneyChart.bind(this);
    this._renderTypeChart = this._renderTypeChart.bind(this);
    this._renderTimeChart = this._renderTimeChart.bind(this);
  }

  init() {
    this._statisticsComponent = new StatisticsView();

    render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);

    this._data = this._routeModel.routePoints;

    this._statisticsComponent.setCharts(this._renderMoneyChart, this._renderTypeChart, this._renderTimeChart);
  }

  destroy() {
    remove(this._statisticsComponent);
  }

  _renderMoneyChart(ctx) {
    const moneySpend = calculateCost(this._data);
    const labels = [...moneySpend.keys()];
    const data = [...moneySpend.values()];
    const backgroundColor = labels.map((item) => BACKGROUND_COLORS[item]);

    ctx.height = 275;

    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: labels.map((type) => type.toUpperCase()),
        datasets: [{
          data,
          backgroundColor,
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          minBarLength: 50,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 15,
            },
            color: '#000000',
            anchor: 'end',
            align: 'start',
            formatter: (val) => `€ ${val}`,
          },
        },
        title: {
          display: true,
          text: 'MONEY',
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  _renderTypeChart(ctx) {
    const timesByType = calculateType(this._data);
    const labels = [...timesByType.keys()];
    const data = [...timesByType.values()];
    const backgroundColor = labels.map((item) => BACKGROUND_COLORS[item]);

    ctx.height = 275;

    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: labels.map((type) => type.toUpperCase()),
        datasets: [{
          data,
          backgroundColor,
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          minBarLength: 50,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 15,
            },
            color: '#000000',
            anchor: 'end',
            align: 'start',
            formatter: (val) => `${val}x`,
          },
        },
        title: {
          display: true,
          text: 'TYPE',
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  _renderTimeChart(ctx) {
    const timeSpend = calculateTime(this._data);
    const labels = [...timeSpend.keys()];
    const data = [...timeSpend.values()];
    const backgroundColor = labels.map((item) => BACKGROUND_COLORS[item]);

    ctx.height = 275;

    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: labels.map((type) => type.toUpperCase()),
        datasets: [{
          data,
          backgroundColor,
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          minBarLength: 50,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 15,
            },
            color: '#000000',
            anchor: 'end',
            align: 'start',
            formatter: (val) => `${val ? calculateDuration(null, null, val) : 0}`,
          },
        },
        title: {
          display: true,
          text: 'TIME',
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }
}

