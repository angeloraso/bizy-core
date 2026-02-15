export enum BIZY_BAR_LINE_CHART_AXIS_POSITION {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export interface IBizyBarLineChartAxis {
  show?: boolean;
  name?: string;
  max?: number;
  min?: number;
  group?: string;
  offset?: number;
  interval?: number;
  independent?: boolean;
  position?: BIZY_BAR_LINE_CHART_AXIS_POSITION,
  formatter?: (item: any ) => string
}

export interface IBizyBarLineChartValue {
  x: string | number;
  y: string | number;
}

export interface IBizyBarLineChartTooltip {
  show?: boolean;
  formatter?: (item: any ) => string;
}

export interface IBizyBarLineChartDownload {
  show?: boolean;
  label?: string;
  fileName?: string;
}

