import { Injectable } from "@angular/core";

const DEFAULT_EMPTY_LABEL = 'Sin elementos';
const DEFAULT_CHART_SIZE = 300;
const DEFAULT_DOWNLOAD = {
  show: true,
  label: 'Descargar',
  fileName: 'Bizy'
};

const DEFAULT_EXPAND = {
  show: true,
  label: 'Expandir'
};

const DEFAULT_TOOLTIP = {
  show: true
};

const DEFAULT_LEGEND = {
  show: false,
  orient: 'vertical' as 'vertical' | 'horizontal',
  position: {
    x: 'auto' as 'auto' | 'left' | 'right' | 'center',
    y: 'auto' as 'auto' | 'top' | 'bottom' | 'center'
  }
};

const DEFAULT_LABEL = {
  show: true,
  overflow: 'break' as 'break' | 'truncate',
  line: true
};

@Injectable()
export class BizyDonutChartService {
  emptyLabel: string = DEFAULT_EMPTY_LABEL;
  chartSize: number = DEFAULT_CHART_SIZE;
  downloadConfig: {show: boolean, label: string, fileName: string} = DEFAULT_DOWNLOAD;
  expandConfig: {show: boolean, label: string} = DEFAULT_EXPAND;
  tooltipConfig: {show: boolean} = DEFAULT_TOOLTIP;
  legendConfig: {show: boolean, orient: 'vertical' | 'horizontal', position: {x: 'auto' | 'left' | 'right' | 'center', y: 'auto' | 'top' | 'bottom' | 'center'}} = DEFAULT_LEGEND;
  labelConfig: {show: boolean, overflow: 'break' | 'truncate', line: boolean} = DEFAULT_LABEL;

  getEmptyLabel = () => this.emptyLabel;

  setEmptyLabel = (label: string) => {
    if (!label) {
      return;
    }

    this.emptyLabel = label;
  }

  getChartSize = () => this.chartSize;

  setChartSize = (size: number) => {
    if (typeof size === 'undefined' || size === null) {
      return;
    }

    this.chartSize = size;
  }

  getDownloadConfig = () => this.downloadConfig;

  setDownloadConfig = (config: {show?: boolean, label?: string, fileName?: string}) => {
    this.downloadConfig = Object.assign(this.downloadConfig, config)
  }

  getExpandConfig = () => this.expandConfig;

  setExpandConfig = (config: {show?: boolean, label?: string}) => {
    this.expandConfig = Object.assign(this.expandConfig, config)
  }

  getTooltipConfig = () => this.tooltipConfig;

  setTooltipConfig = (config: {show?: boolean}) => {
    this.tooltipConfig = Object.assign(this.tooltipConfig, config)
  }

  getLegendConfig = () => this.legendConfig;

  setLegendConfig = (config: {show?: boolean, orient?: 'vertical' | 'horizontal', position?: {x: 'auto' | 'left' | 'right' | 'center', y: 'auto' | 'top' | 'bottom' | 'center'}}) => {
    this.legendConfig = Object.assign(this.legendConfig, config)
  }

  getLabelConfig = () => this.labelConfig;

  setLabelConfig = (config: {show?: boolean, overflow?: 'break' | 'truncate', line?: boolean}) => {
    this.labelConfig = Object.assign(this.labelConfig, config)
  }

}