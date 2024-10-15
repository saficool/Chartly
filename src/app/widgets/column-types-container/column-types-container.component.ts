import { Component, effect, inject } from '@angular/core';
import { ChartDataManagerService } from '../../services/chart-data-manager.service';
import { IChartDataColumnTypes } from '../../interfaces/chartly.interface';

@Component({
  selector: 'app-column-types-container',
  standalone: true,
  imports: [],
  templateUrl: './column-types-container.component.html',
  styleUrl: './column-types-container.component.scss'
})
export class ColumnTypesContainerComponent {

  protected column_types: IChartDataColumnTypes = {
    categorical: [],
    numerical: []
  }

  private chartDataManagerService = inject(ChartDataManagerService)

  constructor() {
    effect(() => {
      if (this.chartDataManagerService.hasData()) {
        this.getChartDataColumnType()
      }
    });
  }

  ngOnInit(): void { }

  async getChartDataColumnType(): Promise<void> {
    this.chartDataManagerService.GetChartdataColumnType()
      .then((data: IChartDataColumnTypes) => {
        this.column_types = data;;
        console.log(this.column_types)
      })
  }

}
