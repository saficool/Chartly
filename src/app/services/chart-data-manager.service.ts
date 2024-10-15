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

  UpdateChartDataColumnTypes(columns: IChartDataColumnTypes): void {
    this.column_types = columns
  }

  /**
   * Move a column from numerical to categorical or vice versa.
   * @param columnName The name of the column to move.
   * @param toCategorical If true, moves column to categorical; otherwise, moves to numerical.
   */
  MoveColumn(columnName: string, toCategorical: boolean): void {
    if (toCategorical) {
      this.moveToCategorical(columnName);
    } else {
      this.moveToNumerical(columnName);
    }
  }



  private updateHasData() {
    this.hasData.set(this.chartData.length > 0);
  }
  private moveToCategorical(columnName: string): void {
    // Find and remove the column from the numerical list if it exists
    const numericalIndex = this.column_types.numerical.indexOf(columnName);
    if (numericalIndex !== -1) {
      this.column_types.numerical.splice(numericalIndex, 1);
      // Add the column to the categorical list if it's not already present
      if (!this.column_types.categorical.includes(columnName)) {
        this.column_types.categorical.push(columnName);
      }
    }
  }

  private moveToNumerical(columnName: string): void {
    // Find and remove the column from the categorical list if it exists
    const categoricalIndex = this.column_types.categorical.indexOf(columnName);
    if (categoricalIndex !== -1) {
      this.column_types.categorical.splice(categoricalIndex, 1);
      // Add the column to the numerical list if it's not already present
      if (!this.column_types.numerical.includes(columnName)) {
        this.column_types.numerical.push(columnName);
      }
    }
  }
}
