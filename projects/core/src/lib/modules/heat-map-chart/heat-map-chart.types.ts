export interface IBizyHeatMapChartData {
  x: number;
  y: number;
  value: number | null;
}

export interface IBizyHeatMapChartRange {
  value?: number;
  min?: number;
  max?: number;
  label?: string;
  color: string;
}
