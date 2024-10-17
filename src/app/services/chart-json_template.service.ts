import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IChartConfiguration } from '../interfaces/chartly.interface';
import { firstValueFrom } from 'rxjs';
import { EChartsOption } from 'echarts';

@Injectable({
    providedIn: 'root'
})

export class ChartJsonTemplateService {

    constructor(private http: HttpClient) { }

    async GetChartsOptionsTemplate(chartType: string): Promise<EChartsOption> {
        const json_skeleton = await firstValueFrom(
            this.http.get<any[]>("chartly/charts_options_template.json")
        );
        return json_skeleton.find(f => f.type === chartType).options
    }
}