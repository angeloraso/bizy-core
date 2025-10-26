import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BizyPopupService } from '../popup';

@Component({
  selector: 'bizy-bar-line-chart-popup',
  template: '',
  styles: [`
    :host {
      display: inline-block;
      height: min(60rem, 90dvh);
      width: min(60rem, 85dvw);
    }
  `]
})
export class BizyBarLineChartPopupComponent implements OnInit {
  readonly #popup = inject(BizyPopupService);
  readonly #renderer = inject(Renderer2);
  readonly #elementRef = inject(ElementRef);
  readonly #ref = inject(ChangeDetectorRef);
  readonly #document = inject(DOCUMENT);

  #echarts: echarts.ECharts | null = null
  #chartContainer: HTMLDivElement | null = null;

  ngOnInit() {
    const data = this.#popup.getData<{
      download: {name: string},
      grid: {left: number, right: number},
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
          this.#echarts.setOption({...data.option, toolbox: {show: false}});

          const showAllLegends = (chart: echarts.ECharts) => {
            const option = chart.getOption();
            option.legend[0].type = 'plain';
            option.grid = {
              left: data.grid.left,
              right: data.grid.right,
              bottom: Math.max(Math.abs((Math.max(option.legend[0].data.length, 5) / 5)) * 30, 60)
            };
            chart.setOption(option);
          }

          showAllLegends(this.#echarts);

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
                  this.#popup.close();
              });
            });
          }, 500);
        });
    }).catch(() => {
      this.#popup.close();
      return;
    });
  }
}
