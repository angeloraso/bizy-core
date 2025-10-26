import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { BizyPopupService } from '../popup';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'bizy-pie-chart-popup',
  template: '',
  styles: [`
    :host {
      display: inline-block;
      height: min(60rem, 90dvh);
      width: min(60rem, 85dvw);
    }
  `]
})
export class BizyPieChartPopupComponent implements OnInit {
  readonly #popup = inject(BizyPopupService);
  readonly #renderer = inject(Renderer2);
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #document = inject(DOCUMENT);

  #echarts: echarts.ECharts | null = null
  #chartContainer: HTMLDivElement | null = null;

  ngOnInit() {
    const data = this.#popup.getData<{
      download: {show: boolean, label: string, name: string}
      option: any
    }>();

    if (!data || !data.option) {
      this.#popup.close();
      return;
    }

    this.#chartContainer = this.#renderer.createElement('div');
    this.#renderer.setStyle(this.#chartContainer, 'width', '100%');
    this.#renderer.setStyle(this.#chartContainer, 'height', '100%');
    this.#renderer.appendChild(this.#elementRef.nativeElement, this.#chartContainer);
    this.#ref.detectChanges();

    import('echarts').then(echarts => {
      this.#echarts = echarts.init(this.#chartContainer);
      Promise.resolve().then(() => {
        this.#echarts.setOption({
          ...data.option,
          series: [{
            ...data.option.series[0],
            minAngle: 1,
            label: {
              ...data.option.series[0].label,
              width: 'none',
              overflow: 'break',
            },
            labelLine: {
              show: data.option.series[0].labelLine?.show,
              length: 50,
              length2: 50
            },
            labelLayout() {
              return { 
                moverOverlap: 'shiftY',
                hideOverlap: false
              };
            },
          }], 
          toolbox: {
            show: true,
            feature: {
              mySaveAsImage: {
                show: data.download.show,
                icon: 'path://M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
                title: data.download.label,
                onclick: () => {
                  setTimeout(() => {
                    import('html2canvas').then(module => {
                    const html2canvas = module.default;
                      html2canvas(this.#chartContainer).then(canvas => {
                          var link = this.#renderer.createElement('a');
                          link.href = canvas.toDataURL('image/png');
                          link.download = `${data.download.name}.png`;
                          this.#renderer.appendChild(this.#document.body, link);
                          link.click();
                          this.#renderer.removeChild(this.#document.body, link);
                      });
                    });
                  }, 500);
                }
              }
            }
          }
        });
      });
    }).catch(() => {
      this.#popup.close();
      return;
    });
  }
}
