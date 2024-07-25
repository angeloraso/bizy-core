export interface IBizyBarLineChartData {
    values?: Array<number>;
    type?: 'bar' | 'line';
    label?: string;
    xLabel?: string;
    yLabel?: string;
    color?: string;
    group?: string;
    hideYAxi?: boolean;
    onYAxisLabelFormatter?: (item: any) => string;
}
