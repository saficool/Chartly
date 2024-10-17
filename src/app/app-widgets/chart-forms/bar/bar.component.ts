import { Component, inject } from '@angular/core';
import { IAggregateNumericalObject, IChartConfiguration, IChartDataColumnTypes } from '../../../interfaces/chartly.interface';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AggregateFunctionEnum } from '../../../enums/chartly.enum';
import { ChartDataManagerService } from '../../../services/chart-data-manager.service';
import { AggregateFunctionsService } from '../../../services/aggregate-functions.service';
import { ChartsService } from '../../../services/charts.service';
import { EnumToArrayPipe } from '../../../pipes/enum-to-array.pipe';
import { RandomNumberGeneratorService } from '../../../services/random-number-generator.service';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [FormsModule, EnumToArrayPipe],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent {
  protected isMultiSeriesChart: boolean = false
  protected chart_configuration_template: IChartConfiguration | any
  //-------------------------------------------------- //

  private chart_data_json: any[] = []
  protected aggregate_functions = AggregateFunctionEnum
  protected column_types: IChartDataColumnTypes = {
    categorical: [], numerical: []
  }
  //-------------------------------------------------------- //
  private chartDataManagerService = inject(ChartDataManagerService)
  private dynamicDialogConfig = inject(DynamicDialogConfig)
  private aggregateFunctionsService = inject(AggregateFunctionsService)
  private randomNumberGeneratorService = inject(RandomNumberGeneratorService)
  protected chartsService = inject(ChartsService)

  constructor() {
    this.getJsonChartData()
    this.getChartDataColumnType()
    this.isMultiSeriesChart = this.dynamicDialogConfig.data.isMultiSeriesChart
    this.chart_configuration_template = this.dynamicDialogConfig.data.chart_configuration_template
  }

  ngOnInit(): void {
  }

  async getJsonChartData(): Promise<void> {
    this.chartDataManagerService.GetJsonChartData().then((data: any[]) => {
      this.chart_data_json = data
    })
  }
  async getChartDataColumnType(): Promise<void> {
    this.chartDataManagerService.GetChartdataColumnType()
      .then((data: IChartDataColumnTypes) => {
        this.column_types = data;
      })
  }
  addAggregateNumericalObject() {
    const aggregateNumericalObject: IAggregateNumericalObject = {
      numerical_column: this.column_types.numerical[0],
      aggregate_function: AggregateFunctionEnum.COUNT
    }
    this.chart_configuration_template.data_object?.aggregate_numerical_objects.push(aggregateNumericalObject)
  }
  removeAggregateNumericalObject(index: number) {
    this.chart_configuration_template.data_object?.aggregate_numerical_objects.splice(index, 1)
  }


  protected async saveChartConfiguration(index: number) {
    await this.prepareChartdata().then(data => {
      this.chart_configuration_template.options.legend!.data = data.legend
      this.chart_configuration_template.options.xAxis.data = data.xAxis
      this.chart_configuration_template.options.series = data.series
    })
    this.chart_configuration_template.title = this.chart_configuration_template.options.title.text

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
              type: 'bar',
              label: { show: true, position: 'top' },
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
              type: 'bar',
              label: { show: true, position: 'top' },
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
              type: 'bar',
              label: { show: true, position: 'top' },
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
              type: 'bar',
              label: { show: true, position: 'top' },
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
              type: 'bar',
              label: { show: true, position: 'top' },
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
              type: 'bar',
              label: { show: true, position: 'top' },
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
              type: 'bar',
              label: { show: true, position: 'top' },
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
              type: 'bar',
              label: { show: true, position: 'top' },
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
              type: 'bar',
              label: { show: true, position: 'top' },
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
              type: 'bar',
              label: { show: true, position: 'top' },
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
      legend: aggregate_numerical_objects.map((m: any) => m.numerical_column),
      xAxis: [..._xAxis]
    }
  }
}
