import { EChartsOption } from "echarts";
import { AggregateFunctionEnum, ChartTypeEnum } from "../enums/chartly.enum";
import { SafeHtml } from "@angular/platform-browser";

export interface IChartConfiguration {
    id: number,
    columns: number,
    type: ChartTypeEnum,
    title: string,
    data_object: IDataObject | undefined,
    options: EChartsOption | undefined
}
export interface IDataObject {
    categorical_column: string,
    aggregate_numerical_objects: IAggregateNumericalObject[]
}
export interface IAggregateNumericalObject {
    numerical_column: string,
    aggregate_function: AggregateFunctionEnum
}


export interface IChartDataManager {
    ClearChartData(): void;
    ImportFile(file: File): Promise<boolean>;
    GetJsonChartData(): Promise<any[]>
    GetChartdataColumnType(): Promise<IChartDataColumnTypes>
}

export interface IChartDataColumnTypes {
    categorical: string[],
    numerical: string[]
}

export interface IAvailableChart {
    chartType: ChartTypeEnum,
    chartIcon: SafeHtml
}


