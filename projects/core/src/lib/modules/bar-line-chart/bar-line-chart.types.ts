export interface IBizyBarLineChartData {
  values?: Array<number>;
  type?: 'bar' | 'line';
  label?: string;
  discrete?: boolean;
  color?: string;
  stack?: string;
  barMinHeight?: number;
  xAxi?: {name: string}
  yAxi?: {
    name?: string,
    hide?: boolean,
    max?: number,
    min?: number,
    interval?: number,
    position?: 'left' | 'right',
    onValueFormatter?: (item: any ) => string
  }
}
