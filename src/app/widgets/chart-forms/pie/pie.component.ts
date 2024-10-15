import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumToArrayPipe } from '../../../pipes/enum-to-array.pipe';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [EnumToArrayPipe, FormsModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss'
})
export class PieComponent {

  // protected default_select: string = ""

  // chart_configuration!: IChartConfiguration
  // aggregate_functions = AggregateFunctionEnum
  // column_types!: IChartDataColumnTypes
  // chart_template!: EChartsOption

  // aggregate_numerical_object: Aggregate_Numerical_Object = {
  //   numerical_column: '',
  //   aggregate_function: AggregateFunctionEnum.COUNT
  // }
  // chart_data_generate_aggregate_object: Chart_Data_Generator_Object = {
  //   categorical_column: '',
  //   aggregate_numerical_objects: []
  // }


  // private chartSkeletonService = inject(ChartSkeletonService)
  // private chartDataManagerService = inject(ChartDataManagerService)

  // ngOnInit(): void {
  //   this.getChartdataColumnType()
  //   this.getChartOptionTemplate()
  //   this.add_aggregate_numerical_object()
  // }

  // protected add_aggregate_numerical_object() {
  //   this.chart_data_generate_aggregate_object.aggregate_numerical_objects.push(JSON.parse(JSON.stringify(this.aggregate_numerical_object)))
  // }

  // protected remove_aggregate_numerical_object(index: number) {
  //   this.chart_data_generate_aggregate_object.aggregate_numerical_objects.splice(index, 1)
  // }

  // private getChartOptionTemplate() {
  //   this.chartSkeletonService.GetAvailableChartsList('pie').subscribe((option: EChartsOption) => {
  //     this.chart_configuration.columns = 12
  //     this.chart_configuration.option = option
  //   })
  // }

  // private getChartdataColumnType() {
  //   this.chartDataManagerService.GetChartdataColumnType()
  //     .then((value: IChartDataColumnTypes) => {
  //       this.column_types = value
  //     })
  // }

}
