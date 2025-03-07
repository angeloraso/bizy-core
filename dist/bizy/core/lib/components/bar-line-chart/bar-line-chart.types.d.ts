export interface IBizyBarLineChartData {
    values?: Array<number>;
    type?: 'bar' | 'line';
    label?: string;
    discrete?: boolean;
    color?: string;
    stack?: string;
    xAxi?: {
        name: string;
    };
    yAxi?: {
        name?: string;
        hide?: boolean;
        position?: 'left' | 'right';
        onValueFormatter?: (item: any) => string;
    };
}
