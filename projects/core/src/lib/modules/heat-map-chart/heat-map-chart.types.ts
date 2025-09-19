export interface IBizyHeatMapChartData {
  x: number;
  y: number;
  value: number | null;
  metadata?: any;
}

export interface IBizyHeatMapChartRange {
  value?: number;
  min?: number;
  max?: number;
  label?: string;
  color: string;
}
