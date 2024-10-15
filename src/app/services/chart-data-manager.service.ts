import { inject, Injectable, signal } from '@angular/core';
import { IChartDataColumnTypes, IChartDataManager } from '../interfaces/chartly.interface';
import { UtilityFunctionsService } from './utility-functions.service';

@Injectable({
  providedIn: 'root'
})
export class ChartDataManagerService implements IChartDataManager {

  private chartData: any[] = []
  private column_types!: IChartDataColumnTypes

  public hasData = signal(false);

  private utilityFunctionsService = inject(UtilityFunctionsService)

  constructor() { }

  ImportFile(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const contents = e.target.result;
          const raw_chart_data_json = this.utilityFunctionsService.CsvToJson(contents);
          this.chartData = this.utilityFunctionsService.FormatJsonData(raw_chart_data_json)
          var column_types = this.utilityFunctionsService.identifyColumnTypes(this.chartData)
          this.column_types = {
            numerical: column_types.numericalColumns,
            categorical: column_types.categoricalColumns
          }
          this.updateHasData();
          resolve(true);
        }
        catch (error) {
          this.chartData = [];
          resolve(false);
        }
      };
      reader.onerror = (error) => {
        reject(false);
      };
      reader.readAsText(file);
    });
  }

  ClearChartData(): void {
    this.chartData = [];
    this.updateHasData();
  }

  GetJsonChartData(): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.chartData);
      }, 100);
    });
  }

  GetChartdataColumnType(): Promise<IChartDataColumnTypes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.column_types);
      }, 100);
    });
  }



  private updateHasData() {
    this.hasData.set(this.chartData.length > 0);
  }
}
