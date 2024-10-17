import { Component, effect, inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AggregateFunctionEnum, ChartTypeEnum } from '../../enums/chartly.enum';
import { AVAILABLE_CHARTS } from '../../consts/chartly.constants';
import { IAvailableChart, IChartConfiguration, IChartDataColumnTypes, IDataObject } from '../../interfaces/chartly.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChartDataManagerService } from '../../services/chart-data-manager.service';
import { ChartJsonTemplateService } from '../../services/chart-json_template.service';
import { EChartsOption } from 'echarts';
import { StringTransformerService } from '../../services/string-transformer.service';
import { DynamicDialogService } from '../../services/dynamic-dialog.service';
import { IDynamicDialog, IDynamicDialogConfig } from '../../interfaces/dynamic-dialog.interface';

@Component({
  selector: 'app-add-new-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-new-chart.component.html',
  styleUrl: './add-new-chart.component.scss'
})
export class AddNewChartComponent {
  protected hasChartData: boolean = false
  protected available_charts: IAvailableChart[] = []

  private stringTransformerService = inject(StringTransformerService)
  private dynamicDialogService: IDynamicDialog = inject(DynamicDialogService)
  private chartDataManagerService = inject(ChartDataManagerService)
  private chartJsonTemplateService = inject(ChartJsonTemplateService)
  private sanitizer = inject(DomSanitizer)

  constructor() {
    effect(() => {
      this.hasChartData = this.chartDataManagerService.hasData()
    });
  }

  ngOnInit(): void {
    this.getAvailableCharts()
  }

  private getAvailableCharts() {
    this.available_charts = AVAILABLE_CHARTS.map((m: IAvailableChart) => {
      return {
        chartType: m.chartType,
        chartIcon: this.sanitizer.bypassSecurityTrustHtml(m.chartIcon as string),
        chartFormTemplate: m.chartFormTemplate,
        isMultiSeriesChart: m.isMultiSeriesChart
      }
    })
  }

  protected async viewNewChartDialog(chartType: IAvailableChart) {
    const config: DynamicDialogConfig = {
      header: `${this.stringTransformerService.ConvertToTitleCase(chartType.chartType)} Chart`,
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
    switch (chartType.chartType) {
      case ChartTypeEnum.LINE:
        config.data = {
          isMultiSeriesChart: chartType.isMultiSeriesChart,
          chart_configuration_template: await this.getChartConfiguration(ChartTypeEnum.LINE)
        }
        dynamicDialogConfig = { component: chartType.chartFormTemplate, config: config };
        break;
      case ChartTypeEnum.BAR:
        config.data = {
          isMultiSeriesChart: chartType.isMultiSeriesChart,
          chart_configuration_template: await this.getChartConfiguration(ChartTypeEnum.BAR)
        }
        dynamicDialogConfig = { component: chartType.chartFormTemplate, config: config };
        break;
      case ChartTypeEnum.PIE:
        config.data = {
          isMultiSeriesChart: chartType.isMultiSeriesChart,
          chart_configuration_template: await this.getChartConfiguration(ChartTypeEnum.PIE)
        }
        dynamicDialogConfig = { component: chartType.chartFormTemplate, config: config };
        break;
      case ChartTypeEnum.RADAR:
        config.data = {
          isMultiSeriesChart: chartType.isMultiSeriesChart,
          chart_configuration_template: await this.getChartConfiguration(ChartTypeEnum.RADAR)
        }
        dynamicDialogConfig = { component: chartType.chartFormTemplate, config: config };
        break;
    }
    this.dynamicDialogService.ShowDialog(dynamicDialogConfig);
  }

  private async getChartConfiguration(chartType: ChartTypeEnum): Promise<IChartConfiguration | undefined> {
    let chart_configuration_template: IChartConfiguration = {
      id: 0,
      columns: 0,
      type: ChartTypeEnum.LINE,
      title: '',
      data_object: undefined,
      options: undefined
    }
    let column_types: IChartDataColumnTypes = { categorical: [], numerical: [] }
    await this.chartDataManagerService.GetChartdataColumnType()
      .then((data: IChartDataColumnTypes) => {
        column_types = data
      })
    await this.chartJsonTemplateService.GetChartsOptionsTemplate(chartType)
      .then((data: EChartsOption | any) => {

        let dataObject: IDataObject = {
          categorical_column: column_types.categorical[0],
          aggregate_numerical_objects: [{
            numerical_column: column_types.numerical[0],
            aggregate_function: AggregateFunctionEnum.COUNT
          }]
        };

        chart_configuration_template.id = 0
        chart_configuration_template.columns = 6
        chart_configuration_template.type = chartType
        chart_configuration_template.title = data.title.text
        chart_configuration_template.options = data
        chart_configuration_template.data_object = dataObject

      })

    return chart_configuration_template
  }

}
