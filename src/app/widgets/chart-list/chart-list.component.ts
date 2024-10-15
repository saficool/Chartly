import { Component, inject } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { IChartConfiguration } from '../../interfaces/chartly.interface';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ChartTypeEnum } from '../../enums/chartly.enum';
import { LineComponent } from '../chart-forms/line/line.component';
import { BarComponent } from '../chart-forms/bar/bar.component';
import { PieComponent } from '../chart-forms/pie/pie.component';
import { ScatterComponent } from '../chart-forms/scatter/scatter.component';
import { BoxplotComponent } from '../chart-forms/boxplot/boxplot.component';
import { CandlestickComponent } from '../chart-forms/candlestick/candlestick.component';
import { GraphComponent } from '../chart-forms/graph/graph.component';
import { HeatmapComponent } from '../chart-forms/heatmap/heatmap.component';
import { RadarComponent } from '../chart-forms/radar/radar.component';
import { IDynamicDialog, IDynamicDialogConfig } from '../../interfaces/dynamic-dialog.interface';
import { DynamicDialogService } from '../../services/dynamic-dialog.service';
import { StringTransformerService } from '../../services/string-transformer.service';

@Component({
  selector: 'app-chart-list',
  standalone: true,
  imports: [],
  templateUrl: './chart-list.component.html',
  styleUrl: './chart-list.component.scss'
})
export class ChartListComponent {
  protected chartsService = inject(ChartsService)
  private dynamicDialogService: IDynamicDialog = inject(DynamicDialogService)
  private stringTransformerService = inject(StringTransformerService)

  ngOnInit(): void { }

  async editThisChart(chart_configs: IChartConfiguration) {
    const config: DynamicDialogConfig = {
      header: `${this.stringTransformerService.ConvertToTitleCase(chart_configs.type)} Chart`,
      width: '500px',
      height: 'auto',
      closeOnEscape: false,
      modal: true,
      resizable: false,
      draggable: true,
      maximizable: false,
      position: "center"
    }
    var dynamicDialogConfig!: IDynamicDialogConfig
    switch (chart_configs.type) {
      case ChartTypeEnum.LINE:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: LineComponent, config: config };
        break;
      case ChartTypeEnum.BAR:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: BarComponent, config: config };
        break;
      case ChartTypeEnum.PIE:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: PieComponent, config: config };
        break;
      case ChartTypeEnum.SCATTER:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: ScatterComponent, config: config };
        break;
      case ChartTypeEnum.BOXPLOT:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: BoxplotComponent, config: config };
        break;
      case ChartTypeEnum.CANDLESTICK:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: CandlestickComponent, config: config };
        break;
      case ChartTypeEnum.GRAPH:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: GraphComponent, config: config };
        break;
      case ChartTypeEnum.HEATMAP:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: HeatmapComponent, config: config };
        break;
      case ChartTypeEnum.RADAR:
        config.data = {
          isMultiSeriesChart: true,
          chart_configuration_template: chart_configs
        }
        dynamicDialogConfig = { component: RadarComponent, config: config };
        break;
    }
    this.dynamicDialogService.ShowDialog(dynamicDialogConfig);
  }

  removeThisChart(index: number) {
    this.chartsService.removeConfiguration(index)
  }

}
