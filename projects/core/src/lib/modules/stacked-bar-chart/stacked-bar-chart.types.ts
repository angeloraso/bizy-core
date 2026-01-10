export enum BIZY_STACKED_BAR_CHART_LEGEND_POSITION {
  TOP = 'top',
  BOTTOM = 'bottom'
}

export interface IBizyStackedBarChartLegends {
  show?: boolean;
  position?: BIZY_STACKED_BAR_CHART_LEGEND_POSITION;
}