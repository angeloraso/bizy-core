export enum ANURA_STACKED_BAR_CHART_LEGEND_POSITION {
  TOP = 'top',
  BOTTOM = 'bottom'
}

export interface IBizyStackedBarChartLegends {
  show?: boolean;
  position?: ANURA_STACKED_BAR_CHART_LEGEND_POSITION;
}