import { Component, EventEmitter, inject, input, Output, SimpleChanges } from '@angular/core';
import { ChartJsonTemplateService } from '../../../services/chart-json_template.service';
import { IAggregateNumericalObject, IChartConfiguration, IChartDataColumnTypes, IDataObject } from '../../../interfaces/chartly.interface';
import { AggregateFunctionEnum, ChartTypeEnum } from '../../../enums/chartly.enum';
import { EChartsOption } from 'echarts';
import { FormsModule } from '@angular/forms';
import { ChartDataManagerService } from '../../../services/chart-data-manager.service';
import { AggregateFunctionsService } from '../../../services/aggregate-functions.service';
import { ChartsService } from '../../../services/charts.service';
import { EnumToArrayPipe } from '../../../pipes/enum-to-array.pipe';
import { RandomNumberGeneratorService } from '../../../services/random-number-generator.service';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [FormsModule, EnumToArrayPipe],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent {

  protected _isMultiSeriesChart = input<boolean>(false)
  protected _chart_configuration_template = input<IChartConfiguration>
  @Output() _chart_configuration_template_change = new EventEmitter<IChartConfiguration>();


  // Belongs to here
  private chart_data_json: any[] = []
  protected aggregate_functions = AggregateFunctionEnum
  // Used in HTMl template
  protected column_types: IChartDataColumnTypes = {
    categorical: [],
    numerical: []
  }
  // Used in HTMl template
  protected dataObject: IDataObject = {
    categorical_column: '',
    aggregate_numerical_objects: []
  }
  // Used in HTMl template
  protected chart_options_template: any = {}
  // Used in HTMl template
  protected chart_configuration_template: IChartConfiguration = {
    id: 0,
    columns: 12,
    type: ChartTypeEnum.LINE,
    title: '',
    data_object: undefined,
    options: undefined
  }

  // Dependency Injection
  private chartJsonTemplateService = inject(ChartJsonTemplateService)
  private chartDataManagerService = inject(ChartDataManagerService)
  private aggregateFunctionsService = inject(AggregateFunctionsService)
  private randomNumberGeneratorService = inject(RandomNumberGeneratorService)
  protected chartsService = inject(ChartsService)

  ngOnInit(): void {
    this.chart_configuration_template.columns = 6
    this.chart_configuration_template.type = ChartTypeEnum.LINE
    this.getJsonChartData()
    this.accumulatedMethodCall()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['_isMultiSeriesChart']) {
      console.log('_isMultiSeriesChart:', this._isMultiSeriesChart);
    }
    if (changes['_chart_configuration_template']) {
      console.log('_chart_configuration_template:', this._chart_configuration_template);
    }

  }

  // It belongs to here
  async getJsonChartData(): Promise<void> {
    this.chartDataManagerService.GetJsonChartData().then((data: any[]) => {
      this.chart_data_json = data
    })
  }

  async accumulatedMethodCall(): Promise<void> {
    await this.getChartdataColumnType()
    await this.getChartsOptionsTemplate()
  }

  async getChartdataColumnType(): Promise<void> {
    this.chartDataManagerService.GetChartdataColumnType()
      .then((data: IChartDataColumnTypes) => {
        this.column_types = data;

        const aggregateNumericalObject: IAggregateNumericalObject = {
          numerical_column: this.column_types.numerical[0],
          aggregate_function: AggregateFunctionEnum.COUNT
        }
        this.dataObject.categorical_column = this.column_types.categorical[0]
        this.dataObject.aggregate_numerical_objects.push(aggregateNumericalObject)
      })
  }

  async getChartsOptionsTemplate(): Promise<void> {
    await this.chartJsonTemplateService.GetChartsOptionsTemplate(ChartTypeEnum.LINE)
      .then((data: EChartsOption) => {
        this.chart_options_template = data
      })
  }

  addAggregateNumericalObject() {
    const aggregateNumericalObject: IAggregateNumericalObject = {
      numerical_column: this.column_types.numerical[0],
      aggregate_function: AggregateFunctionEnum.COUNT
    }
    this.dataObject.aggregate_numerical_objects.push(aggregateNumericalObject)
  }

  removeAggregateNumericalObject(index: number) {
    this.dataObject.aggregate_numerical_objects.splice(index, 1)
  }

  protected async saveChartConfiguration(index: number) {
    this.chart_configuration_template.data_object = this.dataObject
    await this.prepareChartdata().then(data => {
      this.chart_options_template.legend.data = data.legend
      this.chart_options_template.xAxis.data = data.xAxis
      this.chart_options_template.series = data.series
    })
    this.chart_configuration_template.title = this.chart_options_template.title.text
    this.chart_configuration_template.options = this.chart_options_template

    if (this.chart_configuration_template.id == 0) {
      this.chart_configuration_template.id = this.randomNumberGeneratorService.GenerateRandomNumber()
      const _chart_configuration_template = JSON.parse(JSON.stringify(this.chart_configuration_template))
      this.chartsService.addConfiguration(_chart_configuration_template)
    }
    else {
      const _chart_configuration_template = JSON.parse(JSON.stringify(this.chart_configuration_template))
      this.chartsService.updateConfiguration(index, _chart_configuration_template)
    }

  }

  private async prepareChartdata(): Promise<any> {
    let _xAxis: Set<string> = new Set<string>();
    let _data: any[] = []
    const aggregate_numerical_objects = this.chart_configuration_template.data_object?.aggregate_numerical_objects!
    aggregate_numerical_objects.forEach((aggregate_numerical_object: IAggregateNumericalObject) => {
      switch (aggregate_numerical_object.aggregate_function) {
        case AggregateFunctionEnum.AVG:
          const result_avg = this.aggregateFunctionsService.aggregateAverageByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_avg.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_avg = result_avg.map(m => m.category)
          for (const category of categories_avg) { _xAxis.add(category); }
          break;
        case AggregateFunctionEnum.COUNT:
          const result_count = this.aggregateFunctionsService.aggregateCountByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_count.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_count = result_count.map(m => m.category)
          for (const category of categories_count) { _xAxis.add(category); }
          break;
        case AggregateFunctionEnum.MAX:
          const result_max = this.aggregateFunctionsService.aggregateMaxByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_max.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_max = result_max.map(m => m.category)
          for (const category of categories_max) { _xAxis.add(category); }
          break;
        case AggregateFunctionEnum.MEDIAN:
          const result_median = this.aggregateFunctionsService.aggregateMedianByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_median.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_median = result_median.map(m => m.category)
          for (const category of categories_median) { _xAxis.add(category); }
          break;
        case AggregateFunctionEnum.MIN:
          const result_min = this.aggregateFunctionsService.aggregateMinByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_min.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_min = result_min.map(m => m.category)
          for (const category of categories_min) { _xAxis.add(category); }
          break;
        case AggregateFunctionEnum.MODE:
          const result_mode = this.aggregateFunctionsService.aggregateModeByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_mode.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_mode = result_mode.map(m => m.category)
          for (const category of categories_mode) { _xAxis.add(category); }
          break;
        case AggregateFunctionEnum.QTL:
          const result_qtl = this.aggregateFunctionsService.aggregateQuantilesByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column,
            [0.25, 0.5, 0.75, 1]
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_qtl.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_qtl = result_qtl.map(m => m.category)
          for (const category of categories_qtl) { _xAxis.add(category); }
          break;
        case AggregateFunctionEnum.SD:
          const result_sd = this.aggregateFunctionsService.aggregateStandardDeviationByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_sd.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_sd = result_sd.map(m => m.category)
          for (const category of categories_sd) { _xAxis.add(category); }
          break;
        case AggregateFunctionEnum.SUM:
          const result_sum = this.aggregateFunctionsService.aggregateSumByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_sum.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_sum = result_sum.map(m => m.category)
          for (const category of categories_sum) { _xAxis.add(category); }
          break;
        case AggregateFunctionEnum.VR:
          const result_vr = this.aggregateFunctionsService.aggregateVarianceByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          _data.push(
            {
              name: aggregate_numerical_object.numerical_column,
              type: 'line',
              data: result_vr.map(m => Number(m.value.toFixed(2)))
            }
          )
          const categories_vr = result_vr.map(m => m.category)
          for (const category of categories_vr) { _xAxis.add(category); }
          break;
      }
    });

    return {
      series: _data,
      legend: aggregate_numerical_objects.map(m => m.numerical_column),
      xAxis: [..._xAxis]
    }
  }

}
