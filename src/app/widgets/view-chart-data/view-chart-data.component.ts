import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ChartDataManagerService } from '../../services/chart-data-manager.service';
import { IChartDataManager } from '../../interfaces/chartly.interface';
import { IPrimeTableColumn } from '../../interfaces/prime-table-column.interface';
import { StringTransformerService } from '../../services/string-transformer.service';
import { IStringTransformer } from '../../interfaces/string-transformer.interface';

@Component({
  selector: 'app-view-chart-data',
  standalone: true,
  imports: [TableModule],
  templateUrl: './view-chart-data.component.html',
  styleUrl: './view-chart-data.component.scss'
})
export class ViewChartDataComponent {
  chart_data_json!: any[]
  cols!: IPrimeTableColumn[];

  chartDataService: IChartDataManager = inject(ChartDataManagerService)
  stringTransformerService: IStringTransformer = inject(StringTransformerService)

  ngOnInit(): void {
    this.getChartData()
  }

  getChartData(): void {
    this.chartDataService.GetJsonChartData().then((data: any[]) => {
      this.chart_data_json = data
      if (this.chart_data_json.length >= 1) {
        this.setFieldAndHeader(this.chart_data_json[0])
      }
    })
  }

  setFieldAndHeader(data: any) {
    const keys = Object.keys(data)
    this.cols = keys.map((m: string) => {
      return {
        field: m,
        header: this.stringTransformerService.ConvertToTitleCase(m)
      }
    })
  }
}
