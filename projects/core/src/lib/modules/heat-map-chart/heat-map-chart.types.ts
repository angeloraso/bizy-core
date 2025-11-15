export interface IBizyHeatMapChartData {
  x: number;
  y: number;
  value: number | null;
  metadata?: any;
}

export interface IBizyHeatMapHighlightArea {
  from: {x?: number, y?: number};
  to: {x?: number, y?: number};
}

export interface IBizyHeatMapHighlightLine {
  x?: number;
  y?: number;
}

export interface IBizyHeatMapHighlightLineLabel {
  show?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  formatter?: (item: any ) => string
}

export interface IBizyHeatMapChartRange {
  value?: number;
  min?: number;
  max?: number;
  label?: string;
  color: string;
}
