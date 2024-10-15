import { Component, effect, inject } from '@angular/core';
import { ChartDataManagerService } from '../../services/chart-data-manager.service';
import { IChartDataColumnTypes } from '../../interfaces/chartly.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-column-types-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './column-types-container.component.html',
  styleUrl: './column-types-container.component.scss'
})
export class ColumnTypesContainerComponent {

  protected columns: { type: string, column: string }[] = []

  private chartDataManagerService = inject(ChartDataManagerService)

  constructor() {
    this.getChartDataColumnType()
  }

  ngOnInit(): void { }

  async getChartDataColumnType(): Promise<void> {
    this.chartDataManagerService.GetChartdataColumnType()
      .then((data: IChartDataColumnTypes) => {
        const _category_columns = data.categorical.map(m => { return { type: 'C', column: m } })
        const _numeric_columns = data.numerical.map(m => { return { type: 'N', column: m } })
        this.columns.push(..._category_columns)
        this.columns.push(..._numeric_columns)
        this.columns.sort((a, b) => { return a.column.localeCompare(b.column); });
      })
  }

  changeColumnType(index: number) {
    var column = this.columns[index]
    if (column.type == 'N') { column.type = 'C' }
    else { column.type = 'N' }

    this.saveChangedColumn()
  }

  saveChangedColumn() {
    const _numeric_columns = this.columns.filter(f => f.type == 'N').map(m => m.column)
    const _category_columns = this.columns.filter(f => f.type == 'C').map(m => m.column)
    var _columns: IChartDataColumnTypes = {
      numerical: _numeric_columns,
      categorical: _category_columns
    }
    this.chartDataManagerService.UpdateChartDataColumnTypes(_columns)
  }
}
