import { Component, inject } from '@angular/core';
import { EnumToArrayPipe } from '../../../pipes/enum-to-array.pipe';
import { FormsModule } from '@angular/forms';
import { IAggregateNumericalObject, IChartConfiguration, IChartDataColumnTypes } from '../../../interfaces/chartly.interface';
import { AggregateFunctionEnum } from '../../../enums/chartly.enum';
import { ChartDataManagerService } from '../../../services/chart-data-manager.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AggregateFunctionsService } from '../../../services/aggregate-functions.service';
import { RandomNumberGeneratorService } from '../../../services/random-number-generator.service';
import { ChartsService } from '../../../services/charts.service';
import { UniqueService } from '../../../services/unique.service';

@Component({
  selector: 'app-radar',
  standalone: true,
  imports: [FormsModule, EnumToArrayPipe],
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.scss'
})
export class RadarComponent {
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
  private uniqueService = inject(UniqueService)

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
      this.chart_configuration_template.options.radar!.indicator = data.indicator
      this.chart_configuration_template.options.series[0].data = data.series
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
          const result_avg_map = result_avg.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_avg_map)
          break;
        case AggregateFunctionEnum.COUNT:
          const result_count = this.aggregateFunctionsService.aggregateCountByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          const result_count_map = result_count.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_count_map)
          break;
        case AggregateFunctionEnum.MAX:
          const result_max = this.aggregateFunctionsService.aggregateMaxByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          const result_max_map = result_max.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_max_map)
          break;
        case AggregateFunctionEnum.MEDIAN:
          const result_median = this.aggregateFunctionsService.aggregateMedianByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          const result_median_map = result_median.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_median_map)
          break;
        case AggregateFunctionEnum.MIN:
          const result_min = this.aggregateFunctionsService.aggregateMinByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          const result_min_map = result_min.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_min_map)
          break;
        case AggregateFunctionEnum.MODE:
          const result_mode = this.aggregateFunctionsService.aggregateModeByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          const result_mode_map = result_mode.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_mode_map)
          break;
        case AggregateFunctionEnum.QTL:
          const result_qtl = this.aggregateFunctionsService.aggregateQuantilesByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column,
            [0.25, 0.5, 0.75, 1]
          )
          const result_qtl_map = result_qtl.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_qtl_map)
          break;
        case AggregateFunctionEnum.SD:
          const result_sd = this.aggregateFunctionsService.aggregateStandardDeviationByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          const result_sd_map = result_sd.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_sd_map)
          break;
        case AggregateFunctionEnum.SUM:
          const result_sum = this.aggregateFunctionsService.aggregateSumByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          const result_sum_map = result_sum.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_sum_map)
          break;
        case AggregateFunctionEnum.VR:
          const result_vr = this.aggregateFunctionsService.aggregateVarianceByCategory(
            this.chart_data_json,
            this.chart_configuration_template.data_object?.categorical_column!,
            aggregate_numerical_object.numerical_column
          )
          const result_vr_map = result_vr.map(m => {
            return {
              numerical_column: aggregate_numerical_object.numerical_column, // series.data.name
              name: m.category, //radar.indicator.name
              value: m.value //series.data.value
            }
          })
          _data.push(...result_vr_map)
          break;
      }
    });

    let indicator: any[] = []
    const unique_names = this.uniqueService.getUniqueByProperty(_data, 'name').map(m => m.name)
    unique_names.forEach(element => {
      const max_value = Math.max(..._data.filter(f => f.name == element).map(m => Number(m.value.toFixed(2))))
      const _max = Math.ceil(max_value / 10) * 10;
      indicator.push({
        name: element,
        max: _max
      })
    });

    let series_data: any[] = []
    aggregate_numerical_objects.forEach((element: any) => {
      series_data.push({
        name: element.numerical_column,
        value: _data.filter(f => f.numerical_column == element.numerical_column).map(m => Number(m.value.toFixed(2)))
      })
    });
    return {
      series: series_data,
      indicator: indicator
    }
  }
}
